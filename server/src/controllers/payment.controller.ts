import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { appConfig } from 'src/config/appConfig';
import { buildVnpDate, createPaymentUrl, verifyVnpQuery } from 'src/utils/vnpay';
import { orderService } from 'src/services/db/order.service';
import { PaymentStatus } from 'src/enums/order.enum';

class PaymentController {
  public async createVnpayUrl(req: Request, res: Response) {
    const currentUser = req.currentUser!;
    const { orderTotal, cartItems, shippingAddress } = req.body;
    const amountVnd = Number(orderTotal?.cartSubtotal || 0);
    // Tạo order trước với ONLINE + NOT_PAID, dùng _id làm vnp_TxnRef
    const order = await orderService.create(
      { orderTotal, cartItems, shippingAddress, paymentMethod: 'ONLINE' } as any,
      currentUser
    );
    const txnRef = order._id.toString();

    const vnpParams: Record<string, any> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: appConfig.VNP_TMN_CODE,
      vnp_Amount: amountVnd * 100,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: `Order ${txnRef}`,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: appConfig.VNP_RETURN_URL,
      vnp_IpAddr: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
      vnp_CreateDate: buildVnpDate(new Date())
    };
    const paymentUrl = createPaymentUrl(vnpParams);
    res.status(HTTP_STATUS.OK).json({ paymentUrl, txnRef, orderId: order._id });
  }

  public async vnpIpn(req: Request, res: Response) {
    const valid = verifyVnpQuery(req.query as Record<string, any>);
    if (!valid) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ RspCode: '97', Message: 'Checksum failed' });
    }
    const { vnp_ResponseCode, vnp_TxnRef, vnp_Amount } = req.query as unknown as {
      vnp_ResponseCode: string;
      vnp_TxnRef: string;
      vnp_Amount: string;
    };
    try {
      const order = await orderService.getOrderById(vnp_TxnRef);
      if (order.paymentStatus === PaymentStatus.PAID) {
        return res.status(HTTP_STATUS.OK).json({ RspCode: '00', Message: 'OK' });
      }
      if (vnp_ResponseCode === '00') {
        const amountFromGateway = Number(vnp_Amount) / 100;
        if (amountFromGateway !== order.orderTotal.cartSubtotal) {
          return res.status(HTTP_STATUS.OK).json({ RspCode: '04', Message: 'Invalid amount' });
        }
        order.paymentStatus = PaymentStatus.PAID as any;
        order.paidAt = new Date();
        await order.save();
        return res.status(HTTP_STATUS.OK).json({ RspCode: '00', Message: 'OK', orderId: order._id });
      }
      return res.status(HTTP_STATUS.OK).json({ RspCode: '00', Message: 'Failed' });
    } catch (e) {
      return res.status(HTTP_STATUS.OK).json({ RspCode: '01', Message: 'Order not found' });
    }
  }

  public async vnpReturn(req: Request, res: Response) {
    const valid = verifyVnpQuery(req.query as Record<string, any>);
    const code = (req.query as any).vnp_ResponseCode;
    const txnRef = (req.query as any).vnp_TxnRef;
    const success = valid && code === '00';
    const target = `${appConfig.CLIENT_URL}/user/order-confirmation/${txnRef}?success=${success ? '1' : '0'}`;
    res.redirect(target);
  }
}

export const paymentController: PaymentController = new PaymentController();
