import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Check2Circle } from "react-bootstrap-icons";
import { convertToVnd } from "../../utils/ConvertToVnd";
import { getOrder } from "../../apicalls/order";
import Breadcrumb from "../../components/common/Breadcrumb";

const UserOrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrder(orderId);
        if (response.error) {
          navigate();
        } else {
          const formattedOrder = {
            ...response.data,
            orderTotal: {
              itemsCount: response.data.orderTotal.itemsCount,
              cartSubtotal: convertToVnd(response.data.orderTotal.cartSubtotal),
            },
            cartItems: response.data.cartItems.map((item) => {
              return {
                ...item,
                price: convertToVnd(item.price),
              };
            }),
          };
          console.log(formattedOrder);
          setOrder(formattedOrder);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </Container>
    );
  }
  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Xác nhận đơn hàng" }]} />
      <Container className="py-5">
        <Card className="border-0 shadow">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <Check2Circle className="text-success" size={60} />
              <h2 className="mt-3 mb-4">Đặt hàng thành công!</h2>
              <p className="text-muted">
                Mã đơn hàng: {order.orderCode.toUpperCase()}
              </p>
            </div>
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="mb-3">Thông tin giao hàng</h5>
                <Card className="bg-light">
                  <Card.Body>
                    <p className="mb-1">
                      <strong>Họ tên:</strong> {order.shippingAddress.fullName}
                    </p>
                    <p className="mb-1">
                      <strong>Số điện thoại:</strong>{" "}
                      {order.shippingAddress.phoneNumber}
                    </p>
                    <p className="mb-1">
                      <strong>Địa chỉ:</strong>{" "}
                      {order.shippingAddress.apartment}
                    </p>
                    <p className="mb-1">
                      <strong>Phường/Xã:</strong> {order.shippingAddress.ward}
                    </p>
                    <p className="mb-1">
                      <strong>Quận/Huyện:</strong>{" "}
                      {order.shippingAddress.district}
                    </p>
                    <p className="mb-1">
                      <strong>Tỉnh/Thành phố:</strong>{" "}
                      {order.shippingAddress.province}
                    </p>
                    {order.shippingAddress.note && (
                      <p className="mb-1">
                        <strong>Ghi chú:</strong> {order.shippingAddress.note}
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <h5 className="mb-3">Chi tiết đơn hàng</h5>
                <Card className="bg-light">
                  <Card.Body>
                    <div className="mb-3">
                      {order.cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              className="me-2"
                            />
                            <div>
                              <p className="mb-0">{item.name}</p>
                              <small className="text-muted">
                                Số lượng: {item.quantity}
                              </small>
                            </div>
                          </div>
                          <p className="mb-0">{item.price}</p>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p className="mb-1">
                        <strong>Tổng số lượng:</strong>
                      </p>
                      <p className="mb-1">
                        {order.orderTotal.itemsCount} sản phẩm
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-1">
                        <strong>Tổng tiền:</strong>
                      </p>
                      <p className="mb-1">{order.orderTotal.cartSubtotal}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-1">
                        <strong>Phương thức thanh toán:</strong>
                      </p>
                      <p className="mb-1">{order.paymentMethod}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="text-center">
              <Link to="/user/my-orders" className="btn btn-danger me-2">
                Xem đơn hàng của tôi
              </Link>
              <Link to="/product-list" className="btn btn-outline-primary">
                Tiếp tục mua sắm
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserOrderConfirmation;
