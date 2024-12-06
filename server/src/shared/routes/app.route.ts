import { Application } from 'express';
import { authRoute } from 'src/features/auth/routes/auth.route';
import { categoryRoute } from 'src/features/categories/routes/category.route';
import { couponRoute } from 'src/features/coupon/routes/coupon.route';
import { orderRoute } from 'src/features/orders/routes/order.route';
import { productRoutes } from 'src/features/products/routes/product.route';
import { reviewRoutes } from 'src/features/reviews/routes/review.route';
import { userRoute } from 'src/features/users/routes/user.route';

const BASE_PATH = '/api/v1/';
const USER_PATH = '/api/v1/users/';
const CATEGORY_PATH = '/api/v1/categories/';
const PRODUCT_PATH = '/api/v1/products/';
const REVIEW_PATH = '/api/v1/reviews/';
const ORDER_PATH = '/api/v1/orders/';
const COUPON_PATH = '/api/v1/coupons/';
export const appRoute = (app: Application) => {
  app.use(BASE_PATH, authRoute.routes());
  app.use(USER_PATH, userRoute.routes());
  app.use(CATEGORY_PATH, categoryRoute.routes());
  app.use(PRODUCT_PATH, productRoutes.routes());
  app.use(REVIEW_PATH, reviewRoutes.routes());
  app.use(ORDER_PATH, orderRoute.routes());
  app.use(COUPON_PATH, couponRoute.routes());
};
