import React, { useEffect, useState } from "react";
import ProductCarousels from "../components/ProductCarousels";

import CategoryCarousel from "../components/CategoryCarousel ";
import { useSelector } from "react-redux";
import { getBestSeller } from "../apicalls/product";
import ProductForList from "../components/ProductForList";
import { Container, Row } from "react-bootstrap";
import { Button } from "antd";
import { convertToVnd } from "../utils/ConvertToVnd";
import { Link } from "react-router-dom";
function Home() {
  const categories = useSelector((state) => state.category.categories);
  const [productsBestSeller, setProductsBestSeller] = useState();
  const fetchProductBestSeller = async () => {
    try {
      const response = await getBestSeller();
      if (response?.data) {
        const formattedProducts = response.data.map((product, index) => ({
          ...product,
          key: product._id,
          price: convertToVnd(product.price),
          images: product.images[0].url,
        }));
        setProductsBestSeller(formattedProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProductBestSeller();
  }, []);
  return (
    <>
      <ProductCarousels />
      <CategoryCarousel categories={categories} />
      <Container className="py-1">
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ borderRadius: "5px" }}
        >
          <h4 style={{ color: "#dc3545" }}>SẢN PHẨM BÁN CHẠY</h4>
          <Link
            to="/product-list"
            style={{ textDecoration: "none", color: "red" }}
          >
            <Button color="danger" variant="outlined">
              Xem tất cả <i className="bi bi-chevron-right"></i>
            </Button>
          </Link>
        </div>
        <Row xs={1} md={3} lg={5} className="g-4">
          {productsBestSeller?.length > 0 &&
            productsBestSeller.map((product) => {
              return <ProductForList product={product} />;
            })}
        </Row>
      </Container>
    </>
  );
}

export default Home;
