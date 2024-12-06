import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../apicalls/auth";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { convertToKebabCase } from "../../utils/formatter";
function HeaderComponent() {
  const user = useSelector((state) => state.user.userInfo);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = async () => {
    await logout();
    dispatch(logoutUser());
    navigate("/");
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    const formatCtgQuery = convertToKebabCase(searchQuery);
    const formatCtgToggle = convertToKebabCase(searchCategoryToggle);
    if (formatCtgToggle) {
      if (searchQuery) {
        navigate(
          `/product-list/category/${formatCtgToggle}?search=${formatCtgQuery}`
        );
      } else {
        navigate(`/product-list/category/${formatCtgToggle}`);
      }
    } else {
      if (searchQuery) {
        navigate(`/product-list?search=${formatCtgQuery}`);
      } else {
        navigate("/product-list");
      }
    }
  };
  const categories = useSelector((state) => state.category.categories);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/">SHOP ONLINE</Navbar.Brand>
        <div
          className="d-flex"
          style={{
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Form.Select
            className="rounded-start rounded-0"
            style={{
              width: "230px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={(e) => setSearchCategoryToggle(e.target.value)}
          >
            <option value="">Tất cả danh mục </option>;
            {categories &&
              categories.map((category, index) => {
                return (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
          </Form.Select>
          <Form.Control
            type="search"
            placeholder="Nhập tên sản phẩm"
            className="rounded-0"
            style={{
              borderLeft: "none",
              borderRight: "none",
              boxShadow: "none",
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={submitHandler}
          />
          <Button
            variant="danger"
            className="rounded-end rounded-0"
            style={{
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={submitHandler}
          >
            <i className="bi bi-search"></i>
          </Button>
        </div>
        {user ? (
          <div className="d-flex align-items-center gap-3">
            <Nav.Link href="/cart" className="text-light position-relative">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge bg-danger"
                style={{ margin: "5px" }}
              >
                {itemsCount ? itemsCount : ""}
              </span>
            </Nav.Link>
            <NavDropdown
              title={
                <span className="text-white" style={{ fontSize: "1.5rem" }}>
                  <i className="bi bi-person-circle"></i>
                </span>
              }
              style={{ color: "white", paddingLeft: "10px" }}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <span>{user.firstName + " " + user.lastName}</span>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/profile">
                Tài khoản
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/my-orders">
                Đơn hàng
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
          <>
            <Nav>
              <Nav.Link href="/login" className="text-light">
                Đăng nhập
              </Nav.Link>
              <Nav.Link href="/register" className="text-light">
                Đăng ký
              </Nav.Link>
              <Nav.Link href="/cart" className="text-light position-relative">
                <i className="bi bi-cart" style={{ fontSize: "1rem" }}></i>
                <span
                  className="position-absolute start-100 translate-middle badge bg-danger"
                  style={{ margin: "2px" }}
                >
                  {itemsCount ? itemsCount : ""}
                </span>
              </Nav.Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
