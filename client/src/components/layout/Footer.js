import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function FooterComponent() {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col className="bg-dark text-white text-center p-2">@Shop Online</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
