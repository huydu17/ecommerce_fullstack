import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IOrderDocuments } from 'src/interfaces/order.interface';
import { orderService } from 'src/services/db/order.service';

class OrderController {
  public async createOrder(req: Request, res: Response): Promise<void> {
    const order = await orderService.create(req.body, req.currentUser!);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Gửi đơn hàng thành công',
      data: {
        code: order.orderCode,
        _id: order._id
      }
    });
  }
  public async getOrder(req: Request, res: Response): Promise<void> {
    const order: IOrderDocuments = await orderService.getOrderById(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy đơn hàng thành công',
      data: order
    });
  }
  public async getAllOrders(req: Request, res: Response): Promise<void> {
    const orders = await orderService.getAll();
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy tất cả đơn hàng thành công',
      total: orders.length,
      data: orders
    });
  }
  public async getMyOrder(req: Request, res: Response): Promise<void> {
    const order = await orderService.getMyOrders(req.currentUser!);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy đơn hàng thành công',
      data: order
    });
  }
  public async confirmOrder(req: Request, res: Response): Promise<void> {
    const order: IOrderDocuments = await orderService.confirmOrder(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Xác nhận đơn hàng',
      data: order
    });
  }
  public async transitOrder(req: Request, res: Response): Promise<void> {
    const order: IOrderDocuments = await orderService.transitOrder(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Đơn hàng đang vận chuyển',
      data: order
    });
  }
  public async confirmDeliveredOrder(req: Request, res: Response): Promise<void> {
    const order: IOrderDocuments = await orderService.confirmDeliveredOrder(req.params.id);
    res.status(HTTP_STATUS.OK).json({
      message: 'Đơn hàng đã được giao',
      data: order
    });
  }
  public async analysisOrder(req: Request, res: Response): Promise<void> {
    const orders = await orderService.analysisOrder(req.params.date);
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy đơn hàng cho phân tích',
      total: orders.length,
      data: orders
    });
  }
  public async getOrderStats(req: Request, res: Response): Promise<void> {
    const { ordersStats, productStats, userStats } = await orderService.getStats();
    res.status(HTTP_STATUS.OK).json({
      message: 'Lấy thống kê đơn hàng',
      data: {
        ordersStats,
        productStats,
        userStats
      }
    });
  }
}

export const orderController: OrderController = new OrderController();
