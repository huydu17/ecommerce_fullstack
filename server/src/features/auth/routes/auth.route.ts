// import express from 'express';
// import { authController } from '../controllers/auth.controller';
// const authRoute = express.Router();
// authRoute.post('/signup', authController.signup);
// export default authRoute;

import express, { Router } from 'express';
import { signUpSchema } from '../schemes/register';
import { asyncWrapper } from 'src/shared/middlewares/globalErrorHandle';
import { validateSchema } from 'src/shared/middlewares/joi-validate.middleware';
import { authController } from '../controllers/auth.controller';
import { signInSchema } from '../schemes/login';
import { emailSchema } from '../schemes/email';
import { passwordSchema } from '../schemes/password';
import { authMiddlware } from 'src/shared/middlewares/auth.middleware';
import { resetPasswordSchema } from '../schemes/reset-password';
import { changePasswordGoogleSchema } from '../schemes/change-password-with-google';
class AuthRoute {
  private route: Router;
  constructor() {
    this.route = express.Router();
  }
  public routes(): Router {
    this.route.post('/register', validateSchema(signUpSchema), asyncWrapper(authController.register));
    this.route.post('/login', validateSchema(signInSchema), asyncWrapper(authController.login));
    this.route.post('/login-with-google', asyncWrapper(authController.loginWithGoogle));
    this.route.post('/refresh-token', asyncWrapper(authController.refreshToken));
    this.route.post('/forgot-password', validateSchema(emailSchema), asyncWrapper(authController.forgotPassword));
    this.route.post(
      '/reset-password/:token',
      validateSchema(resetPasswordSchema),
      asyncWrapper(authController.resetPassword)
    );
    this.route.put(
      '/change-password',
      authMiddlware.isLogin,
      validateSchema(passwordSchema),
      asyncWrapper(authController.changePassword)
    );
    this.route.put(
      '/change-password-with-google',
      authMiddlware.isLogin,
      validateSchema(changePasswordGoogleSchema),
      asyncWrapper(authController.changePassword)
    );
    this.route.post('/logout', authMiddlware.isLogin, asyncWrapper(authController.logout));
    return this.route;
  }
}

export const authRoute: AuthRoute = new AuthRoute();
