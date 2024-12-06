import React from "react";
import { Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaStar } from "react-icons/fa";
const ProductForList = ({ product }) => {
  return (
    <Col className="d-flex align-items-stretch">
      <LinkContainer
        to={`/product-details/${product.key}`}
        style={{ cursor: "pointer", width: "100%" }}
      >
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={product.images}
            alt={product.name}
            className="img-fluid custom-img-size"
            loading="lazy" // Thêm lazy-loading
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="h5 mb-2">
              <div class="product-name">
                <small>{product.name}</small>
              </div>
            </Card.Title>
            <Card.Text>
              <div className="text-danger fw-medium">
                <small> {product.price}</small>
              </div>
              <div>
                <small>
                  <FaStar
                    className="mb-1"
                    style={{
                      color: "rgb(255 193 7)",
                    }}
                  />{" "}
                  {product.averageRating}
                </small>
                {" | "}
                <small>Đã bán: {product.totalSold}</small>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  );
};

export default ProductForList;
