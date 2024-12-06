import { ICouponDocument, ICouponPayload } from 'src/features/coupon/interfaces/coupon.interface';
import { Coupon } from 'src/features/coupon/models/coupon.scheme';
import { BadRequestException } from 'src/shared/middlewares/globalErrorHandle';
import { UserPayload } from 'src/type';

class CouponService {
  public async getAll() {
    return await Coupon.find({});
  }
  public async create(data: ICouponPayload, currentUser: UserPayload) {
    const { code, startDate, endDate, discount } = data;
    const couponExist = await Coupon.findOne({ code: code?.toUpperCase() });
    if (couponExist) {
      throw new BadRequestException('Mã đã tồn tại');
    }
    if (isNaN(discount) || discount <= 0 || discount >= 100) {
      throw new BadRequestException('Mã không hợp lệ');
    }
    await Coupon.create({
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
      user: currentUser.userId
    });
  }
  public async getById(id: string) {
    const coupon: ICouponDocument | null = await Coupon.findById(id);
    if (!coupon) {
      throw new BadRequestException('Không tìm thấy mã này!');
    }
    return coupon;
  }
  public async update(id: string, data: ICouponPayload) {
    const { code, startDate, endDate, discount } = data;
    await Coupon.findByIdAndUpdate(
      id,
      {
        code: code?.toUpperCase(),
        discount,
        startDate,
        endDate
      },
      {
        new: true
      }
    );
  }
  public async delete(id: string) {
    await Coupon.findByIdAndDelete(id);
  }
}
export const couponSerice: CouponService = new CouponService();
