import { userService } from './user.service';
import { UserPayload } from 'src/type';
import { mailTransport } from '../email/email.transport';
import { resetTemplate } from '../email/templates/reset-password/reset-password';
import { IChangePassword, ILoginData, IRegisterData, ITokenDocument } from 'src/interfaces/auth.interface';
import { IUserDocument } from 'src/interfaces/user.interface';
import { BadRequestException, UnAuthorizedException } from 'src/middlewares/globalErrorHandle';
import { User } from 'src/models/user.schema';
import { Token } from 'src/models/token.schema';
import { verifyToken } from 'src/utils/verify-token';
import { TokenGenerator } from 'src/utils/genarateToken';
import { generateRadomHex } from 'src/utils/generateRandomHex';
import { appConfig } from 'src/config/appConfig';
import { Helpers } from 'src/utils/helpers';

class AuthService {
  public async register(requestBody: IRegisterData) {
    const { email } = requestBody;
    const existingUser: IUserDocument = (await userService.getUserByEmail(email)) as IUserDocument;
    if (existingUser) {
      throw new BadRequestException('Người dùng đã tồn tại');
    }
    const data = await this.registerData(requestBody);
    const user: IUserDocument = await User.create(data);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(user);
    return { user, accessToken, refreshToken };
  }

  public async login(requestBody: ILoginData) {
    const { emailOrUsername, password } = requestBody;
    const userFound = await this.validateUserAndPassword(emailOrUsername, password);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(userFound);
    return { userFound, accessToken, refreshToken };
  }

  public async loginWithGoogle(payloadUserGoogle: any) {
    return await this.findOrCreateGoogleUser(payloadUserGoogle);
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnAuthorizedException('Refresh token is required');
    }
    const payload: UserPayload | any = verifyToken(refreshToken);
    if (!payload) {
      throw new UnAuthorizedException('Invalid refresh token');
    }
    const token = await Token.findOne({ refreshToken });
    if (!token) {
      throw new UnAuthorizedException('Invalid refresh token or user not found');
    }
    const { iat, exp, aud, iss, ...newPayload } = payload;
    const tokens = TokenGenerator.generateToken(newPayload);
    await Token.findByIdAndUpdate(token._id, { refreshToken: tokens.refreshToken }, { new: true });
    return tokens;
  }

  public async forgotPassword(email: string): Promise<void> {
    const existingUser: IUserDocument = (await userService.getUserByEmail(email)) as IUserDocument;
    if (!existingUser) {
      throw new BadRequestException('Email is not exist');
    }
    const resetToken: string = generateRadomHex(`${existingUser._id}`);
    await this.updateResetPasswordToken(`${existingUser._id}`, resetToken, Date.now() + 15 * 60 * 1000);
    const resetLink = `${appConfig.CLIENT_URL}/reset-password/${resetToken}`;
    const template = resetTemplate.resetPasswordTemplate(
      `${existingUser.firstName + ' ' + existingUser.lastName}`,
      resetLink
    );
    await mailTransport.sendMail(existingUser.email, 'Reset password', template);
  }

  public async resetPassword(newPassword: string, token: string): Promise<void> {
    const tokenFound: ITokenDocument = (await this.getTokenByResetToken(token)) as ITokenDocument;
    if (!tokenFound) {
      throw new BadRequestException('Token không hợp lệ');
    }
    const user: IUserDocument = (await userService.getUserById(`${tokenFound.userId}`)) as IUserDocument;
    user.password = newPassword;
    tokenFound.passwordResetToken = undefined;
    tokenFound.passwordResetTokenExpiresAt = undefined;
    await Promise.all([tokenFound.save(), user.save()]);
  }

  public async changePassword(data: IChangePassword, currentUser: UserPayload) {
    const { newPassword, oldPassword } = data;
    const user: IUserDocument = (await userService.getUserById(`${currentUser.userId}`)) as IUserDocument;
    if (!user.googleId && oldPassword) {
      const isOldPasswordCorrect = await user.comparePassword(oldPassword);
      if (!isOldPasswordCorrect) {
        throw new BadRequestException('Mật khẩu cũ không đúng');
      }
      const isNewPasswordDuplicate = await user.comparePassword(newPassword);
      if (isNewPasswordDuplicate) {
        throw new BadRequestException('Mật khẩu mới không được trùng với mật khẩu hiện tại');
      }
    }
    user.password = newPassword;
    await user.save();
    return user;
  }

  private async getTokenByResetToken(resetToken: string) {
    const token: ITokenDocument = (await Token.findOne({
      passwordResetToken: resetToken,
      passwordResetTokenExpiresAt: { $gt: Date.now() }
    })) as ITokenDocument;
    return token;
  }

  private async updateResetPasswordToken(userId: string, resetToken: string, tokenExpires: number) {
    const updatedToken = await Token.findOneAndUpdate(
      { userId },
      {
        passwordResetToken: resetToken,
        passwordResetTokenExpiresAt: tokenExpires
      },
      { new: true, upsert: true }
    );
    if (!updatedToken) {
      throw new BadRequestException('Không thể cập nhật mã đặt lại mật khẩu');
    }
  }

  private async generateAndSaveTokens(user: IUserDocument) {
    const payload: UserPayload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: user.role
    };
    const { accessToken, refreshToken } = TokenGenerator.generateToken(payload);
    await Token.findOneAndUpdate(
      { userId: user._id },
      {
        refreshToken,
        $unset: {
          verifyToken: 1,
          verifyTokenExpiresAt: 1
        }
      },
      {
        upsert: true,
        new: true
      }
    );
    return { accessToken, refreshToken };
  }

  private async validateUserAndPassword(emailOrUsername: string, password?: string) {
    const userFound: IUserDocument | null = await userService.getUserByEmailOrUsername(emailOrUsername);
    if (!userFound) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    if (password) {
      const isMatch = await userFound.comparePassword(password);
      if (!isMatch) {
        throw new BadRequestException('Mật khẩu không đúng');
      }
    }
    return userFound;
  }

  private async findOrCreateGoogleUser(payloadUserGoogle: any) {
    const { email, picture, given_name, family_name, sub } = payloadUserGoogle;
    let userExisting: IUserDocument = (await userService.getUserByEmail(email)) as IUserDocument;
    if (!userExisting) {
      const resData = {
        firstName: given_name,
        lastName: family_name,
        email,
        avatar: picture,
        googleId: sub,
        password: ''
      };
      const data = await this.registerData(resData);
      userExisting = await User.create(data);
    }
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(userExisting);
    return { user: userExisting, accessToken, refreshToken };
  }

  private async registerData(data: IRegisterData) {
    const { firstName, lastName, email } = data;
    return {
      ...data,
      userName: await Helpers.validateUsername(firstName + lastName),
      email: Helpers.lowerCase(email)
    };
  }

  public async revokeRefreshToken(token: string): Promise<void> {
    await Token.deleteOne({ refreshToken: token });
  }
}

export const authService: AuthService = new AuthService();
