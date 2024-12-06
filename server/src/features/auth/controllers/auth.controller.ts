import { Request, Response } from 'express';
import { authService } from 'src/shared/services/db/auth.service';
import HTTP_STATUS from 'http-status-codes';
import { ACCESSTOKEN, REFRESHTOKEN } from '../constants/token.constant';
import { setCookies } from 'src/shared/utils/cookie';

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    setCookies(res, accessToken, refreshToken);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Đăng ký thành công',
      user,
      accessToken,
      refreshToken
    });
  }
  public async login(req: Request, res: Response): Promise<void> {
    const { userFound, accessToken, refreshToken } = await authService.login(req.body);
    setCookies(res, accessToken, refreshToken);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Đăng nhập thành công',
      user: userFound,
      accessToken,
      refreshToken
    });
  }
  public async loginWithGoogle(req: Request, res: Response): Promise<void> {
    const { user, accessToken, refreshToken } = await authService.loginWithGoogle(req.body);
    setCookies(res, accessToken, refreshToken);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Đăng nhập thành công',
      user,
      accessToken,
      refreshToken
    });
  }
  public async refreshToken(req: Request, res: Response): Promise<void> {
    const { accessToken, refreshToken } = await authService.refreshToken(req.cookies.refreshToken);
    setCookies(res, accessToken, refreshToken);
    res.status(HTTP_STATUS.OK).json({
      accessToken,
      refreshToken
    });
  }
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    await authService.forgotPassword(req.body.email);
    res.status(HTTP_STATUS.OK).json({
      message: 'Vui lòng kiểm tra Email'
    });
  }
  public async resetPassword(req: Request, res: Response): Promise<void> {
    await authService.resetPassword(req.body.newPassword, req.params.token);
    res.status(HTTP_STATUS.OK).json({
      message: 'Đặt lại mật khẩu thành công'
    });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    await authService.changePassword(req.body, req.currentUser!);
    res.status(HTTP_STATUS.OK).json({
      message: 'Đổi mật khẩu thành công'
    });
  }

  public async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie(ACCESSTOKEN);
    res.clearCookie(REFRESHTOKEN);
    res.status(HTTP_STATUS.OK).json({
      message: 'Đăng xuất thành công'
    });
  }
}

export const authController: AuthController = new AuthController();
