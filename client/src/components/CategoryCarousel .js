import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LinkContainer } from "react-router-bootstrap";
import { convertToKebabCase } from "../utils/formatter";
const CategoryCarousel = ({ categories }) => {
  return (
    <Container className="my-4">
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ borderRadius: "5px" }}
      >
        <h4 style={{ color: "#dc3545" }}>DANH MỤC</h4>
        <Link
          to="/product-list"
          style={{ textDecoration: "none", color: "red" }}
        >
          <Button color="danger" variant="outlined">
            Xem tất cả <i className="bi bi-chevron-right"></i>
          </Button>
        </Link>
      </div>
      <Row>
        {categories.length > 0 &&
          categories.slice(0, 5).map((category, index) => (
            <LinkContainer
              to={`/product-list/category/${convertToKebabCase(category.name)}`}
              style={{ cursor: "pointer" }}
              key={index}
            >
              <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
                <Card className="text-center shadow-sm border-light">
                  <i
                    className={category?.icon}
                    style={{ fontSize: "30px" }}
                  ></i>
                  <Card.Body>
                    <Card.Title className="h6">{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </LinkContainer>
          ))}
      </Row>
    </Container>
  );
};

export default CategoryCarousel;
