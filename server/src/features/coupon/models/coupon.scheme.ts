import mongoose from 'mongoose';
import { ICouponDocument } from '../interfaces/coupon.interface';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true
    },
    startDate: {
      type: Date,
      require: true
    },
    endDate: {
      type: Date,
      require: true
    },
    discount: {
      type: Number,
      require: true,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);
couponSchema.virtual('isExpired').get(function (this: ICouponDocument) {
  return this.endDate.getTime() < Date.now();
});
couponSchema.pre('validate', function (this: ICouponDocument, next) {
  if (this.endDate.getTime() < Date.now()) {
    next(new Error('Ngày hết hạn không được bé hơn ngày hiện tại'));
  }
  next();
});
couponSchema.pre('validate', function (this: ICouponDocument, next) {
  if (this.startDate.getTime() > this.endDate.getTime()) {
    next(new Error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc'));
  }
  next();
});
couponSchema.pre('validate', function (this: ICouponDocument, next) {
  if (this.startDate.getTime() < Date.now()) {
    next(new Error('Ngày bắt đầu phải lớn hơn ngày ngày hiện tại'));
  }
  next();
});
couponSchema.virtual('getDayLeft').get(function (this: ICouponDocument, next) {
  const dayLeft = 'Còn ' + Math.ceil((this.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) + ' ngày';
  return dayLeft;
});

const Coupon = mongoose.model('Coupon', couponSchema);
export { Coupon };
