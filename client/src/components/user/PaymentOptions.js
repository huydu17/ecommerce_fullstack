import React from "react";
import { Form } from "react-bootstrap";

function PaymentOptions({ setTypePay }) {
  return (
    <Form>
      <Form.Check
        type="radio"
        id="cod"
        name="payment"
        value="COD"
        label="Thanh toán khi nhận hàng"
        onChange={(e) => setTypePay(e.target.value)}
        defaultChecked
      />
      <Form.Check
        type="radio"
        id="online"
        name="payment"
        value="ONLINE"
        label="Thanh toán VNPay"
        onChange={(e) => setTypePay(e.target.value)}
      />
    </Form>
  );
}

export default PaymentOptions;
