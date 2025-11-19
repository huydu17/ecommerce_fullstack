import { NextFunction, Request, Response } from 'express';
import { ForbiddenException, UnAuthorizedException } from './globalErrorHandle';
import { verifyToken } from '../utils/verify-token';
import { UserPayload } from 'src/type';

class AuthMiddleware {
  public isLogin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new UnAuthorizedException('Không có token. Vui lòng đăng nhập lại');
    }
    try {
      const payload: UserPayload = verifyToken(token) as UserPayload;
      req.currentUser = payload;
    } catch (error: any) {
      throw new UnAuthorizedException('Token không hợp lệ. Vui lòng đăng nhập lại');
    }
    next();
  }

  public checkPermission(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.currentUser!.role)) {
        throw new ForbiddenException('Bạn không có quyền thực hiện hành động này');
      }
      next();
    };
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
