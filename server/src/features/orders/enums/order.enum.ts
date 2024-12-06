export enum PaymentStatus {
  PAID = 'Đã thanh toán',
  NOT_PAID = 'Chưa thanh toán'
}

export enum PaymentMethod {
  COD = 'Thanh toán khi nhận hàng',
  PAY_ONLINE = 'Thanh toán Online'
}

export enum OrderStatus {
  PENDING = 'Đang xử lý',
  APPROVED = 'Đã xác nhận',
  IN_TRANSIT = 'Đang vận chuyển',
  DELIVERED = 'Đã giao'
}
