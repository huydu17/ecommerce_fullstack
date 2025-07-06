import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { couponSerice } from 'src/services/db/coupon.service';

class CouponController {
  public async getAllCoupon(req: Request, res: Response): Promise<void> {
    const coupons = await couponSerice.getAll();
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy tất cả mã giảm giá thành công',
      data: coupons
    });
  }
  public async createCoupon(req: Request, res: Response): Promise<void> {
    await couponSerice.create(req.body, req.currentUser!);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo mã giảm giá thành công'
    });
  }
  public async getCoupon(req: Request, res: Response): Promise<void> {
    const coupon = await couponSerice.getById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy mã giảm giá thành công',
      data: coupon
    });
  }
  public async updateCoupon(req: Request, res: Response): Promise<void> {
    await couponSerice.update(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật mã giảm giá thành công'
    });
  }
  public async deleteCoupon(req: Request, res: Response): Promise<void> {
    await couponSerice.delete(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Xóa mã giảm giá thành công'
    });
  }
}

export const couponController: CouponController = new CouponController();
