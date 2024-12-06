import React from "react";
import { Col, Form, Row } from "react-bootstrap";
function ShippingAddressForm({
  shippingAddress,
  onChange,
  handlePhoneNumberChange,
  phoneNumberError,
}) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label>
          Khách hàng <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Khách hàng"
          name="fullName"
          onChange={onChange}
          value={shippingAddress.fullName}
        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập tên khách hàng
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>
          Số điện thoại <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Số điện thoại"
          name="phoneNumber"
          onChange={handlePhoneNumberChange}
          isInvalid={phoneNumberError}
          value={shippingAddress.phoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          Số điện thoại không hợp lệ
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formApartment">
        <Form.Label>
          Số nhà, chung cư <span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Số nhà, chung cư"
          name="apartment"
          onChange={onChange}
          value={shippingAddress.apartment}
        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập số nhà, chung cư
        </Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="formWard">
            <Form.Label>
              Phường/Xã <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Phường/Xã"
              name="ward"
              onChange={onChange}
              value={shippingAddress.ward}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập phường/xã
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="formDistrict">
            <Form.Label>
              Quận/Huyện <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Quận/Huyện"
              name="district"
              onChange={onChange}
              value={shippingAddress.district}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập quận/huyện
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="formProvince">
            <Form.Label>
              Tỉnh/Thành Phố <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Tỉnh/Thành Phố"
              name="province"
              onChange={onChange}
              value={shippingAddress.province}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tỉnh/thành phố
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Ghi chú</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Ghi chú về đơn hàng của bạn"
          name="note"
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
}

export default ShippingAddressForm;
