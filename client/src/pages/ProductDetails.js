import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, ListGroup } from "react-bootstrap";
import Star from "../components/common/Star";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { convertToNumber, convertToVnd } from "../utils/ConvertToVnd";
import Review from "../components/Review";
import { get } from "../apicalls/product";
import { createReview } from "../apicalls/review";
import Breadcrumb from "../components/common/Breadcrumb";
import SuccessToast from "../components/common/SuccessToast";
import ErrorToast from "../components/common/ErrorToast";
import parse from "html-react-parser";
function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [reviewed, setReviewed] = useState(false);
  const [writeReview, setWriteReview] = useState({ content: "", rating: 1 });
  const user = useSelector((state) => state.user.userInfo);
  const fetchProduct = useCallback(async () => {
    try {
      const response = await get(productId);
      if (response.data) {
        const formattedProduct = {
          ...response.data,
          price: convertToVnd(response.data.price),
        };
        setProduct(formattedProduct);
      }
    } catch (err) {
      console.log(err);
    }
  }, [productId, reviewed]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: convertToNumber(product.price),
        image: product.images[0].url,
        quantity: quantity,
      })
    );
    SuccessToast("Đã thêm sản phẩm vào giỏ hàng");
  };
  const handleSendReview = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await createReview(productId, writeReview);
      if (response.error) {
        ErrorToast(response.message);
      } else {
        SuccessToast(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setWriteReview({ content: "", rating: 1 });
      setReviewed(!reviewed);
    }
  };
  return (
    <>
      <Breadcrumb
        items={[
          { home: true },
          { label: "Sản phẩm", link: "/product-list" },
          { label: product.name },
        ]}
        pageTitle={product.name}
      />
      <Container className="py-4">
        <Row className="g-4">
          <Col md={5}>
            <div className="position-relative">
              <img
                src={product.images && product.images[currentImage].url}
                alt="Product"
                className="w-100 rounded mb-3"
              />
              <div className="d-flex overflow-auto gap-2 thumbnail-container">
                {product.images &&
                  product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`Thumbnail ${idx}`}
                      className={`thumbnail-image cursor-pointer ${
                        currentImage === idx ? "border border-primary" : ""
                      }`}
                      onClick={() => setCurrentImage(idx)}
                    />
                  ))}
              </div>
            </div>
          </Col>
          <Col
            md={7}
            className="product-details p-4 bg-white rounded shadow-sm"
          >
            <div className="mb-4">
              <h1 className="h3 fw-bold text-dark">{product.name}</h1>
            </div>
            <div className="d-flex align-items-center gap-3 mb-2 pb-3 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4 fw-bold text-danger">
                  {product.averageRating}
                </span>
                <div className="d-flex text-warning">
                  <Star stars={product.averageRating} />
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 text-secondary">
                <span className="vr"></span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-chat-dots me-1"></i>
                  <span>{product.totalReviews} Đánh Giá</span>
                </div>
                <span className="vr"></span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-bag-check me-1"></i>
                  <span>{product.totalSold} Đã Bán</span>
                </div>
              </div>
            </div>
            <div
              className="fs-4 fw-bold text-danger mb-2 p-2 rounded"
              style={{ backgroundColor: "#f3f3f3" }}
            >
              {product.price}
            </div>
            <div className="description-section mb-2">
              <h6 className="fw-bold mb-3">Mô tả</h6>
              <p className="text-secondary lh-base">
                {product.shortDescription}
              </p>
            </div>
            {product.attributes && (
              <div className="attributes-section">
                {product?.attributes.map((attr, index) => (
                  <div key={index} className="d-flex py-2 border-bottom">
                    <span className="text-secondary" style={{ width: "120px" }}>
                      {attr.key}:
                    </span>
                    <span className="fw-medium">{attr.value}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 mt-3">Số lượng</h6>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <input
                    type="text"
                    className="form-control mx-2"
                    style={{ width: "60px" }}
                    value={quantity}
                    onChange={(e) => {
                      const inputValue = parseInt(e.target.value) || 1;
                      setQuantity(
                        Math.min(
                          inputValue,
                          product.totalQty - product.totalSold
                        )
                      );
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      setQuantity(
                        Math.min(
                          quantity + 1,
                          product.totalQty - product.totalSold
                        )
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <span className="text-muted">
                  {" "}
                  {product.totalQty - product.totalSold} sản phẩm có sẵn
                </span>
              </div>
            </div>
            <div className="d-flex gap-3">
              <Button
                variant="danger"
                className="px-4 py-2 d-flex align-items-center gap-2"
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart"></i>
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </Col>
        </Row>
        <div className="mt-4">
          <div className="mb-3">
            <h4 className="bg-light p-3">MÔ TẢ CHI TIẾT</h4>
            <p>{parse(product.description)}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-3">
            <h4 className="bg-light p-3">ĐÁNH GIÁ SẢN PHẨM</h4>
            <ListGroup variant="flush">
              {product?.reviews?.length > 0 ? (
                product.reviews.map((review, index) => {
                  return <Review review={review} key={index} />;
                })
              ) : (
                <Alert variant="danger">Chưa có đánh giá nào</Alert>
              )}
            </ListGroup>
          </div>
        </div>
        {user && (
          <div className="mt-4">
            <div className="mb-3">
              <h5>Viết đánh giá</h5>
              <ReviewForm
                handleSendReview={handleSendReview}
                setWriteReview={setWriteReview}
                writeReview={writeReview}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
export default ProductDetails;
