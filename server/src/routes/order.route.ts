import express, { Router } from 'express';
import { authMiddlware } from 'src/middlewares/auth.middleware';
import { orderController } from '../controllers/order.controller';
import { orderSchema } from 'src/schemas/order';
import { validateSchema } from 'src/middlewares/joi-validate.middleware';
import { asyncWrapper } from 'src/middlewares/globalErrorHandle';
class OrderRoute {
  private route: Router;
  constructor() {
    this.route = express.Router();
  }
  public routes(): Router {
    this.route.post(
      '/create-order',
      authMiddlware.isLogin,
      validateSchema(orderSchema),
      asyncWrapper(orderController.createOrder)
    );
    this.route.get('/admin-get-all', asyncWrapper(orderController.getAllOrders));
    this.route.get('/get-order/:id', authMiddlware.isLogin, asyncWrapper(orderController.getOrder));
    this.route.get('/my-orders', authMiddlware.isLogin, asyncWrapper(orderController.getMyOrder));
    this.route.put('/confirm-order/:id', authMiddlware.isLogin, asyncWrapper(orderController.confirmOrder));
    this.route.put('/transit-order/:id', authMiddlware.isLogin, asyncWrapper(orderController.transitOrder));
    this.route.put(
      '/confirm-delivered/:id',
      authMiddlware.isLogin,
      asyncWrapper(orderController.confirmDeliveredOrder)
    );
    this.route.get(
      '/analysis/:date',
      authMiddlware.isLogin,
      authMiddlware.checkPermission('admin'),
      asyncWrapper(orderController.analysisOrder)
    );
    this.route.get('/stats', asyncWrapper(orderController.getOrderStats));
    return this.route;
  }
}

export const orderRoute: OrderRoute = new OrderRoute();
