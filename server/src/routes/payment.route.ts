import { Router } from 'express';
import { paymentController } from 'src/controllers/payment.controller';
import { authMiddleware } from 'src/middlewares/auth.middleware';

class PaymentRoute {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/vnpay/create', authMiddleware.isLogin, paymentController.createVnpayUrl);
    this.router.get('/vnpay/ipn', paymentController.vnpIpn);
    this.router.get('/vnpay/return', paymentController.vnpReturn);
    return this.router;
  }
}

export const paymentRoute: PaymentRoute = new PaymentRoute();


