import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { RiDeleteBin2Line } from "react-icons/ri";
import { convertToVnd } from "../utils/ConvertToVnd";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../redux/slices/cartSlice";

function CartItem({ item }) {
  const { productId, image, name, price, quantity } = item;
  const dispatch = useDispatch();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const priceFormat = convertToVnd(price);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setCurrentQuantity(newQuantity);
    }
  };

  const handleBlur = () => {
    dispatch(updateCartItem({ productId, price, quantity: currentQuantity }));
  };

  const handleDeleteCartItem = (event) => {
    event.preventDefault();
    dispatch(removeFromCart({ productId, price, quantity }));
  };

  return (
    <Row className="align-items-center">
      <Col xs={2}>
        <Image src={image} alt={item.name} fluid width={100} />
      </Col>
      <Col xs={5}>
        <h6>{name}</h6>
      </Col>
      <Col xs={2}>
        <h6>{priceFormat}</h6>
      </Col>
      <Col xs={2} style={{ width: "20" }}>
        <Form.Control
          type="number"
          min="1"
          value={currentQuantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleBlur}
        />
      </Col>
      <Col xs={1}>
        <Button variant="danger" type="button" onClick={handleDeleteCartItem}>
          <RiDeleteBin2Line size={20} />
        </Button>
      </Col>
    </Row>
  );
}

export default CartItem;
