import mongoose, { Types } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from 'src/enums/order.enum';
const randomTxt = Math.random().toString(36).substring(7).toLocaleLowerCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      default: randomTxt + randomNumbers
    },
    user: {
      type: Types.ObjectId,
      requred: true,
      ref: 'User'
    },
    orderTotal: {
      itemsCount: { type: Number, required: true },
      cartSubtotal: { type: Number, required: true }
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, default: '' },
      phoneNumber: { type: String, required: true },
      apartment: { type: String, required: true },
      ward: { type: String, required: true },
      district: { type: String, required: true },
      province: { type: String, required: true },
      note: { type: String }
    },
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.NOT_PAID
    },
    paidAt: {
      type: Date
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      default: PaymentMethod.COD
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

export { Order };
