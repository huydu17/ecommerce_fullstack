import { IOrderDocuments } from 'src/features/orders/intefaces/order.interface';
import { Order } from 'src/features/orders/models/order.schema';
import { productService } from './product.service';
import { UserPayload } from 'src/type';
import { OrderStatus, PaymentMethod, PaymentStatus } from 'src/features/orders/enums/order.enum';
import { BadRequestException } from 'src/shared/middlewares/globalErrorHandle';
import { userService } from './user.service';

class OrderService {
  public async create(data: IOrderDocuments, currentUser: UserPayload) {
    const { shippingAddress, cartItems, paymentMethod, orderTotal } = data;
    let ids = cartItems.map((item) => {
      return item.productId;
    });
    let qtys = cartItems.map((item) => {
      return Number(item.quantity);
    });
    await productService.updateProductStock(ids, qtys);
    const order = new Order({
      user: currentUser.userId,
      orderTotal: orderTotal,
      shippingAddress: { ...shippingAddress, email: currentUser.email },
      cartItems: cartItems
    });
    if (paymentMethod === 'ONLINE') {
      order.paymentMethod = PaymentMethod.PAY_ONLINE;
      order.paymentStatus = PaymentStatus.PAID;
      order.paidAt = new Date();
    }
    await order.save();
    return order;
  }
  public async getAll() {
    const orders = await Order.find({}).sort({ createdAt: 'desc' });
    return orders;
  }

  public async confirmOrder(orderId: string) {
    const order = await this.getOrderById(orderId);
    if (order.status === OrderStatus.PENDING) {
      order.status = OrderStatus.APPROVED;
      await order.save();
      return order;
    }
    throw new BadRequestException('Chưa có đơn hàng');
  }
  public async getOrderById(orderId: string) {
    const order: IOrderDocuments = (await Order.findById(orderId)) as IOrderDocuments;
    if (!order) {
      throw new BadRequestException('Không tìm thấy đơn hàng nào!');
    }
    return order;
  }
  public async getMyOrders(currentUser: UserPayload) {
    const orders = await Order.find({ user: currentUser.userId }).sort({ createdAt: 'desc' });
    return orders;
  }
  public async transitOrder(orderId: string) {
    const order = await this.getOrderById(orderId);
    if (order.status === OrderStatus.APPROVED) {
      order.status = OrderStatus.IN_TRANSIT;
      await order.save();
      return order;
    }
    throw new BadRequestException('Đơn hàng chưa được xác nhận');
  }
  public async confirmDeliveredOrder(orderId: string) {
    const order = await this.getOrderById(orderId);
    if (order.status === OrderStatus.IN_TRANSIT) {
      order.status = OrderStatus.DELIVERED;
      order.deliveredAt = new Date();
      order.paymentStatus = PaymentStatus.PAID;
      await order.save();
      return order;
    }
    throw new BadRequestException('Đơn hàng chưa được vận chuyển');
  }
  public async analysisOrder(date: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const orders = await Order.find({
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      createdAt: { $gte: start, $lte: end }
    }).sort({ updatedAt: 'asc' });
    return orders;
  }
  public async getStats() {
    const ordersStats = await Order.aggregate([
      { $match: { status: OrderStatus.DELIVERED, paymentStatus: PaymentStatus.PAID } },
      { $group: { _id: null, totalRevenue: { $sum: '$orderTotal.cartSubtotal' }, totalOrder: { $sum: 1 } } }
    ]);
    const productStats = await productService.productStats();
    const userStats = await userService.useStats();
    return { ordersStats, productStats, userStats };
  }
}
export const orderService: OrderService = new OrderService();
