import express, { Router } from 'express';
import { couponController } from '../controllers/coupon.controller';
class CouponRoute {
  private route: Router;
  constructor() {
    this.route = express.Router();
  }
  public routes(): Router {
    this.route.get('/get-all', couponController.getAllCoupon);
    this.route.get('/:id', couponController.getCoupon);
    this.route.post('/', couponController.createCoupon);
    this.route.put('/:id', couponController.updateCoupon);
    this.route.delete('/:id', couponController.deleteCoupon);
    return this.route;
  }
}

export const couponRoute: CouponRoute = new CouponRoute();
