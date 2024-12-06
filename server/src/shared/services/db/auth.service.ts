import { Helpers } from 'src/shared/utils/helpers';
import { BadRequestException, UnAuthorizedException } from 'src/shared/middlewares/globalErrorHandle';
import { TokenGenerator } from 'src/shared/utils/genarateToken';
import { IUserDocument } from 'src/features/users/interfaces/user.interface';
import { User } from 'src/features/users/models/user.schema';
import { ITokenDocument } from 'src/features/auth/interfaces/token.interface';
import { Token } from 'src/features/auth/models/token.schema';
import { userService } from './user.service';
import { IRegisterData } from 'src/features/auth/interfaces/register.interface';
import { ILoginData } from 'src/features/auth/interfaces/login.interface';
import { UserPayload } from 'src/type';
import { generateRadomHex } from 'src/shared/utils/generateRandomHex';
import { mailTransport } from '../email/email.transport';
import { appConfig } from 'src/shared/config/appConfig';
import { resetTemplate } from '../email/templates/reset-password/reset-password';
import { IChangePassword } from 'src/features/auth/interfaces/change-password';
import { verifyToken } from 'src/shared/utils/verify-token';

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
    const token: ITokenDocument | null = await Token.findOne({ userId: userFound._id.toString() });
    if (!token) {
      throw new BadRequestException('Token không tồn tại');
    }
    token.refreshToken = refreshToken;
    await token.save();
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
    await Token.findByIdAndUpdate({ _id: token._id }, { refreshToken: tokens.refreshToken });
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
    const user: IUserDocument = (await userService.getUserById(`${currentUser.userId}`)) as IUserDocument;
    if (!user.googleId && data.oldPassword) {
      const isOldPasswordCorrect = await user.comparePassword(data.oldPassword);
      if (!isOldPasswordCorrect) {
        throw new BadRequestException('Mật khẩu cũ không đúng');
      }
      const isNewPasswordDuplicate = await user.comparePassword(data?.newPassword);
      if (isNewPasswordDuplicate) {
        throw new BadRequestException('Mật khẩu mới không được trùng với mật khẩu hiện tại');
      }
    }
    user.password = data.newPassword;
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
    const existingToken: ITokenDocument = (await Token.findOne({ userId })) as ITokenDocument;
    if (!existingToken) {
      throw new BadRequestException('Reset token is invalid');
    }
    existingToken.passwordResetToken = resetToken;
    existingToken.passwordResetTokenExpiresAt = tokenExpires;
    await existingToken.save();
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
    await Token.create({
      userId: user._id,
      refreshToken
    });
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
}

export const authService: AuthService = new AuthService();
