import express, { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import {
  changePasswordGoogleSchema,
  emailSchema,
  passwordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema
} from 'src/schemas/auth';
import { validateSchema } from 'src/middlewares/joi-validate.middleware';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
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
      authMiddleware.isLogin,
      validateSchema(passwordSchema),
      asyncWrapper(authController.changePassword)
    );
    this.route.put(
      '/change-password-with-google',
      authMiddleware.isLogin,
      validateSchema(changePasswordGoogleSchema),
      asyncWrapper(authController.changePassword)
    );
    this.route.post('/logout', authMiddleware.isLogin, asyncWrapper(authController.logout));
    return this.route;
  }
}

export const authRoute: AuthRoute = new AuthRoute();
