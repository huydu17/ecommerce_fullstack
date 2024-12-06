import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function ProductCarouselsComponent() {
  return (
    <>
      <Container>
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide7.png"
              alt="First slide"
              height={450}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide2.png"
              alt="Second slide"
              height={450}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide3.png"
              alt="Third slide"
              height={450}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide5.png"
              alt="First slide"
              height={450}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide6.png"
              alt="First slide"
              height={450}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/slide7.png"
              alt="First slide"
              height={450}
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}

export default ProductCarouselsComponent;
