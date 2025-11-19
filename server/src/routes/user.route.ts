import express, { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
import { updateInfoSchema, updateUserByAdminSchema } from 'src/schemas/user';
import { validateSchema } from 'src/middlewares/joi-validate.middleware';

class UserRoute {
  private route: Router;
  constructor() {
    this.route = express.Router();
  }
  public routes(): Router {
    this.route.get('/get-me', authMiddleware.isLogin, asyncWrapper(userController.getMe));
    this.route.get('/:id', authMiddleware.isLogin, asyncWrapper(userController.get));
    this.route.get('/', asyncWrapper(userController.getAll));
    this.route.put(
      '/update-info',
      authMiddleware.isLogin,
      validateSchema(updateInfoSchema),
      asyncWrapper(userController.updateInfo)
    );
    this.route.delete('/:id', authMiddleware.isLogin, asyncWrapper(userController.delete));
    this.route.put(
      '/update-user-by-admin/:id',
      authMiddleware.isLogin,
      validateSchema(updateUserByAdminSchema),
      asyncWrapper(userController.updateUserByAdmin)
    );
    return this.route;
  }
}

export const userRoute: UserRoute = new UserRoute();
