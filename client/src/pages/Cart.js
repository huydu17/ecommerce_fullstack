import React from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { convertToVnd } from "../utils/ConvertToVnd";
import { LinkContainer } from "react-router-bootstrap";
import Breadcrumb from "../components/common/Breadcrumb";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.cartSubtotal);
  const total = convertToVnd(subTotal);
  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Giỏ hàng" }]} />
      <Container className="my-5">
        <Row className="shadow-sm p-5">
          <Col md={8}>
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div key={idx} className="mb-4">
                  <CartItem item={item} />
                </div>
              ))
            ) : (
              <Alert variant="danger">
                Chưa có sản phẩm nào trong giỏ hàng!
              </Alert>
            )}
            <div className="d-flex justify-content-start">
              <Link to="/product-list">
                <Button variant="outline-primary" className="mt-3">
                  ← Trở lại SHOP
                </Button>
              </Link>
            </div>
          </Col>
          {cartItems.length > 0 && (
            <Col md={4}>
              <Card className="sticky-top" style={{ top: "20px" }}>
                <Card.Header as="h4" className="text-danger">
                  ĐƠN HÀNG
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      <b>Tạm tính</b>
                    </span>
                    <span className="text-end">{total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      <b>Phí vận chuyển</b>
                    </span>
                    <span className="text-end">0 ₫</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      <b>Tổng tiền</b>
                    </span>
                    <span className="text-end">
                      <b style={{ color: "red" }}>{total}</b>
                    </span>
                  </div>
                  <LinkContainer to="/user/cart-details">
                    <Button
                      variant="warning"
                      size="lg"
                      className="w-100"
                      disabled={cartItems.length === 0}
                    >
                      Thanh toán
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Cart;
