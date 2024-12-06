import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOrder } from "../apicalls/order";
import OrderSummary from "../components/user/OrderSummary";
import BackButton from "../components/common/BackButton";
import { formatDateDetails, toLocaleUpperCase } from "../utils/formatter";
import { OrderStatus, PaymentStatus } from "../constants/orderStatus";
import Loading from "../components/Loading";

const OrderDetailsBase = ({ isAdmin = false, additionalActions }) => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [updatedOrder, setUpdatedOrder] = useState(false);

  const fetchOrder = async (orderId) => {
    try {
      setLoading(true);
      const response = await getOrder(orderId);
      if (!response.error) {
        setOrder(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId, updatedOrder]);

  const renderOrderStatus = () => {
    const statusColors = {
      [OrderStatus.PENDING]: "warning",
      [OrderStatus.APPROVED]: "primary",
      [OrderStatus.IN_TRANSIT]: "info",
      [OrderStatus.DELIVERED]: "success",
    };

    return (
      <Badge bg={statusColors[order.status] || "secondary"}>
        {order.status}
      </Badge>
    );
  };

  return (
    <>
      {loading && <Loading />}
      <Container>
        <BackButton />
        <Card>
          <Card.Body>
            <div className="max-w-6xl mx-auto">
              <Row>
                <Col md={isAdmin ? 7 : 6}>
                  <h3 className="font-weight-bold text-primary mb-3">
                    Thông tin chi tiết
                  </h3>
                  <h6 className="font-weight-bold mb-3">
                    <b>Mã đơn hàng:</b>{" "}
                    {order.orderCode && (
                      <span className="text-danger">
                        {toLocaleUpperCase(order?.orderCode)}
                      </span>
                    )}
                  </h6>
                  <p>
                    <strong>Họ tên:</strong> {order?.shippingAddress?.fullName}
                  </p>
                  {isAdmin && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {order?.shippingAddress?.email || ""}
                    </p>
                  )}
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {order?.shippingAddress?.phoneNumber}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {order.shippingAddress?.apartment}
                    , {order.shippingAddress?.ward},{" "}
                    {order.shippingAddress?.district},{" "}
                    {order.shippingAddress?.province}
                  </p>
                  <p>
                    <strong>Ngày đặt hàng:</strong>{" "}
                    {formatDateDetails(order?.createdAt)}
                  </p>
                  <p>
                    <strong>Trạng thái đơn hàng:</strong> {renderOrderStatus()}
                  </p>
                  <p>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order?.paymentMethod}
                  </p>
                  {order.paymentStatus === PaymentStatus.PAID && (
                    <p>
                      <strong>Thanh toán lúc:</strong>{" "}
                      {formatDateDetails(order?.paidAt)}
                    </p>
                  )}
                  {order.status === OrderStatus.DELIVERED && (
                    <p>
                      <strong>Nhận hàng lúc:</strong>{" "}
                      {formatDateDetails(order?.deliveredAt)}
                    </p>
                  )}
                </Col>

                <Col md={isAdmin ? 5 : 6}>
                  <Card className="p-3">
                    {order.cartItems && order.orderTotal?.cartSubtotal && (
                      <OrderSummary
                        cartItems={order.cartItems}
                        subTotal={order.orderTotal.cartSubtotal}
                      />
                    )}
                    {isAdmin &&
                      additionalActions &&
                      additionalActions(order, () =>
                        setUpdatedOrder(!updatedOrder)
                      )}
                  </Card>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default OrderDetailsBase;
