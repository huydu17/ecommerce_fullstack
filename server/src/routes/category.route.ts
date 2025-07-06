import express, { Router } from 'express';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
import { authMiddlware } from 'src/middlewares/auth.middleware';
import { categoryController } from '../controllers/category.controller';
class CategoryRoute {
  private route: Router;
  constructor() {
    this.route = express.Router();
  }
  public routes(): Router {
    this.route.post('/', authMiddlware.isLogin, asyncWrapper(categoryController.createCategory));
    this.route.get('/getAll', asyncWrapper(categoryController.getCategories));
    this.route.get('/:id', authMiddlware.isLogin, asyncWrapper(categoryController.getCategoryById));
    this.route.put('/:id', authMiddlware.isLogin, asyncWrapper(categoryController.updateCategory));
    this.route.delete('/:id', authMiddlware.isLogin, asyncWrapper(categoryController.deleteCategory));
    this.route.put('/update/save-attrs', authMiddlware.isLogin, asyncWrapper(categoryController.saveAttributes));
    return this.route;
  }
}

export const categoryRoute: CategoryRoute = new CategoryRoute();
