import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import SortOptions from "../components/filterQueryOptions/SortOptions";
import PriceFilter from "../components/filterQueryOptions/PriceFilter";
import RatingFilter from "../components/filterQueryOptions/RatingFilter";
import CategoryFilter from "../components/filterQueryOptions/CategoryFilter";
import AttributesFilter from "../components/filterQueryOptions/AttributesFilter";
import ProductPagination from "../components/ProductPagination";
import { convertToVnd } from "../utils/ConvertToVnd";
import ProductForList from "../components/ProductForList";
import { getAllProducts } from "../apicalls/product";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { convertToNormalCase } from "../utils/formatter";
import Loading from "../components/Loading";
import Breadcrumb from "../components/common/Breadcrumb";

function ProductList() {
  const { categoryName } = useParams() || "";
  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get("search");
  let page = +searchParams.get("page") || 1;
  if (searchQuery) {
    searchQuery = convertToNormalCase(searchQuery);
  }
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(null);
  const [attributesFilter, setAttributesFilter] = useState([]);
  const categories = useSelector((state) => state.category.categories);
  const [attrsFromFilter, setAttrsFromFilter] = useState([]);
  const [categoryChoosen, setCategoryChoosen] = useState("");
  const [priceFromFilter, setPriceFromFilter] = useState();
  const [applyPriceRange, setApplyPriceRange] = useState();
  const [ratingFromFilter, setRatingFromFilter] = useState();
  const [sortOptions, setSortOptions] = useState("");

  const fetchProducts = async (
    page,
    searchQuery,
    attrsFromFilter,
    categoryChoosen,
    ratingFromFilter,
    applyPriceRange,
    sortOptions
  ) => {
    try {
      setLoading(true);
      const response = await getAllProducts(
        page,
        searchQuery,
        attrsFromFilter,
        categoryChoosen,
        ratingFromFilter,
        applyPriceRange,
        sortOptions
      );
      if (response.data) {
        const formattedProducts = response.data.map((product, index) => ({
          ...product,
          key: product._id,
          price: convertToVnd(product.price),
          images: product.images[0].url,
        }));
        setProducts(formattedProducts);
        console.log(response);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchProducts(
      page,
      searchQuery,
      attrsFromFilter,
      categoryChoosen,
      ratingFromFilter,
      applyPriceRange,
      sortOptions
    );
  }, [
    page,
    searchQuery,
    attrsFromFilter,
    categoryChoosen,
    ratingFromFilter,
    applyPriceRange,
    sortOptions,
  ]);
  useEffect(() => {
    if (categoryName) {
      const ctgName = convertToNormalCase(categoryName);
      const foundCategory = categories.find((item) => item.name === ctgName);
      if (foundCategory) {
        setAttributesFilter(foundCategory.attributes);
        setCategoryChoosen(ctgName);
      }
    } else {
      setAttributesFilter([]);
      setCategoryChoosen(null);
    }
  }, [categoryName, categories]);

  useEffect(() => {
    if (categoryChoosen) {
      const foundCategory = categories.find(
        (item) => item.name === categoryChoosen
      );
      if (foundCategory) {
        setAttributesFilter(foundCategory.attributes);
        setAttrsFromFilter([]);
      }
    } else {
      setAttributesFilter([]);
      setAttrsFromFilter([]);
    }
  }, [categories, categoryChoosen]);

  const resetFilters = () => {
    setAttrsFromFilter([]);
    setCategoryChoosen("");
    setPriceFromFilter(undefined);
    setApplyPriceRange(undefined);
    setRatingFromFilter(undefined);
    setSortOptions("");
    navigate("/product-list");
  };
  return (
    <>
      {loading && <Loading />}
      <Breadcrumb
        items={[{ home: true }, { label: "Sản phẩm" }]}
        pageTitle="Danh sách sản phẩm"
      />
      <Container className="mt-3">
        <Row>
          <Col xs={3}>
            <ListGroup>
              <ListGroup.Item>
                <SortOptions
                  setSortOptions={setSortOptions}
                  resetFilters={resetFilters}
                />
              </ListGroup.Item>
              {!location.pathname.match(/\/category/) && (
                <ListGroup.Item>
                  {
                    <CategoryFilter
                      categories={categories}
                      setCategoryChoosen={setCategoryChoosen}
                      categoryChoosen={categoryChoosen}
                      setAttrsFromFilter={setAttrsFromFilter}
                    />
                  }
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                {
                  <PriceFilter
                    priceFromFilter={priceFromFilter}
                    setPriceFromFilter={setPriceFromFilter}
                    setApplyPriceRange={setApplyPriceRange}
                  />
                }
              </ListGroup.Item>
              <ListGroup.Item>
                {
                  <RatingFilter
                    setRatingFromFilter={setRatingFromFilter}
                    ratingFromFilter={ratingFromFilter}
                  />
                }
              </ListGroup.Item>
              {attributesFilter.length > 0 && (
                <ListGroup.Item>
                  {
                    <AttributesFilter
                      attributesFilter={attributesFilter}
                      setAttrsFromFilter={setAttrsFromFilter}
                      attrsFromFilter={attrsFromFilter}
                    />
                  }
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col md={9}>
            <Container className="py-1">
              <Row xs={1} md={2} lg={4} className="g-4">
                {products.map((product) => (
                  <ProductForList product={product} key={product.key} />
                ))}
              </Row>
            </Container>
            <ProductPagination
              page={page}
              totalPages={totalPages}
              categoryName={categoryName}
              searchQuery={searchQuery}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
