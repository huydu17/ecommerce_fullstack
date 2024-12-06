import React from "react";
import { Card, Form } from "react-bootstrap";
import { formatDateDetails, toLocaleUpperCase } from "../../utils/formatter";

function OrderInforForm({ order }) {
  const { shippingAddress } = order;
  return (
    <Card className="p-3">
      <h3 className="text-lg font-semibold ">Thông tin chi tiết</h3>
      <h6 className="text-lg font-semibold mb-3">
        Mã đơn hàng:{" "}
        {order.orderCode && (
          <span style={{ color: "red" }}>
            {toLocaleUpperCase(order.orderCode)}
          </span>
        )}
      </h6>

      <Form>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Khách hàng</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={shippingAddress?.fullName || "Không có thông tin"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={shippingAddress?.email || "Không có thông tin"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={shippingAddress?.phoneNumber || "Không có thông tin"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formApartment">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            readOnly
            value={
              shippingAddress
                ? `${shippingAddress.apartment || ""}, ${
                    shippingAddress.ward || ""
                  }, ${shippingAddress.district || ""}, ${
                    shippingAddress.province || ""
                  }`
                : "Không có thông tin"
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formOrderStatus">
          <Form.Label>Trạng thái đơn hàng</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={order?.status || "Không có thông tin"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPaymentMethod">
          <Form.Label>Thanh toán</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={
              order?.paymentMethod === "Thanh toán khi nhận hàng"
                ? order.paymentMethod
                : `${order.paymentMethod} vào lúc ${formatDateDetails(
                    order.paidAt
                  )}`
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDeliveredAt">
          <Form.Label>Nhận hàng lúc</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={
              order?.deliveredAt
                ? new Date(order.deliveredAt).toLocaleString("vi-VN")
                : "Chưa cập nhật"
            }
          />
        </Form.Group>
        {shippingAddress?.note && (
          <Form.Group className="mb-3">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              readOnly
              value={shippingAddress.note}
            />
          </Form.Group>
        )}
      </Form>
    </Card>
  );
}

export default OrderInforForm;
