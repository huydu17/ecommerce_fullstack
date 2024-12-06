import React from "react";
import { Col, Row } from "react-bootstrap";
import { convertToVnd } from "../../utils/ConvertToVnd";

function OrderSummary({ cartItems, subTotal }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">ĐƠN HÀNG</h3>
      <Row>
        <Col md={8}>
          <span className="font-medium">
            <strong>Sản phẩm</strong>
          </span>
        </Col>
        <Col md={4}>
          <span className="font-medium">
            <strong>Giá</strong>
          </span>
        </Col>
      </Row>
      {cartItems.map((item, idx) => (
        <>
          <Row key={idx}>
            <Col md={8}>
              <span>
                {item.quantity} x {item.name}
              </span>
            </Col>
            <Col md={4}>
              <span>{convertToVnd(item.price)}</span>
            </Col>
          </Row>
          <hr className="mt-2 mb-2" />
        </>
      ))}

      <div className="flex justify-between mb-4">
        <span>
          <strong>Tổng tiền:</strong>{" "}
        </span>
        <span className="text-lg font-bold">
          <strong style={{ color: "red" }}>{convertToVnd(subTotal)}</strong>
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
