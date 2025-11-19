import { Document, ObjectId } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../enums/order.enum';

export interface IOrderDocuments extends Document {
  orderCode: string;
  user: string | ObjectId;
  orderTotal: OrderTotal;
  shippingAddress: IShippingAddress;
  cartItems: ICartItems[];
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  status: OrderStatus;
  deliveredAt: Date;
  paidAt:Date
}

interface OrderTotal {
  itemsCount: number;
  cartSubtotal: number;
}
export interface IShippingAddress {
  fullName: string;
  email: string;
  phoneNumber: string;
  apartment: string;
  ward: string;
  district: string;
  province: string;
}

export interface ICartItems {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
