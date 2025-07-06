import { Router } from 'express';
import { authMiddlware } from 'src/middlewares/auth.middleware';
import { productController } from '../controllers/product.controller';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
import { upload } from 'src/middlewares/upload';
import { validateSchema } from 'src/middlewares/joi-validate.middleware';
import { createProductSchema, updateProductSchema } from 'src/schemas/product';

class ProductRoute {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.get('/:id', asyncWrapper(productController.get));
    this.router.get('/', asyncWrapper(productController.getAll));
    this.router.get('/category/:categoryName', asyncWrapper(productController.getAll));
    this.router.get('/list/best-seller', asyncWrapper(productController.getBestSeller));
    this.router.get(
      '/admin/get-all',
      authMiddlware.isLogin,
      authMiddlware.checkPermission('admin'),
      asyncWrapper(productController.adminGetAll)
    );

    this.router.post(
      '/create-product',
      authMiddlware.isLogin,
      upload,
      validateSchema(createProductSchema),
      asyncWrapper(productController.create)
    );
    this.router.put(
      '/update-product/:id',
      authMiddlware.isLogin,
      upload,
      validateSchema(updateProductSchema),
      asyncWrapper(productController.update)
    );
    this.router.delete('/:id', authMiddlware.isLogin, asyncWrapper(productController.delete));
    return this.router;
  }
}

export const productRoute: ProductRoute = new ProductRoute();
