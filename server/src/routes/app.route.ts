import { Application } from 'express';
import { authRoute } from './auth.route';
import { userRoute } from './user.route';
import { categoryRoute } from './category.route';
import { productRoute } from './product.route';
import { reviewRoute } from './review.route';
import { orderRoute } from './order.route';
import { couponRoute } from './coupon.route';

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
  app.use(PRODUCT_PATH, productRoute.routes());
  app.use(REVIEW_PATH, reviewRoute.routes());
  app.use(ORDER_PATH, orderRoute.routes());
  app.use(COUPON_PATH, couponRoute.routes());
};
