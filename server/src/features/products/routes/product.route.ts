import { Router } from 'express';
import { validateSchema } from 'src/shared/middlewares/joi-validate.middleware';
import { createUpdateProductScheme } from '../schemes/create-update-product';
import { authMiddlware } from 'src/shared/middlewares/auth.middleware';
import { productController } from '../controllers/product.controller';
import { asyncWrapper } from 'src/shared/middlewares/globalErrorHandle';
import { upload } from 'src/shared/middlewares/upload';
import { createProductScheme } from '../schemes/create-product';

class ProductRoutes {
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
      validateSchema(createProductScheme),
      asyncWrapper(productController.create)
    );
    this.router.put(
      '/update-product/:id',
      upload,
      validateSchema(createUpdateProductScheme),
      asyncWrapper(productController.update)
    );
    this.router.delete('/:id', asyncWrapper(productController.delete));
    return this.router;
  }
}

export const productRoutes: ProductRoutes = new ProductRoutes();
