import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  Bag,
  Box,
  People,
  BoxArrowRight,
  Bell,
  Grid,
} from "react-bootstrap-icons";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { logout } from "../../apicalls/auth";
import { logoutUser } from "../../redux/slices/userSlice";
const AdminSidebar = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const menuItems = [
    {
      paths: ["/admin/dashboard"],
      icon: <MdDashboard className="me-2" size={18} />,
      label: "Dashboard",
      onclick: () => navigate("/admin/dashboard"),
    },
    {
      paths: ["/admin/orders", "/admin/order-detail"],
      icon: <Bag className="me-2" size={18} />,
      label: "Đơn hàng",
      onclick: () => navigate("/admin/orders"),
    },
    {
      paths: ["/admin/categories"],
      icon: <Grid className="me-2" size={18} />,
      label: "Danh mục",
      onclick: () => navigate("/admin/categories"),
    },
    {
      paths: ["/admin/products", "/admin/edit-product"],
      icon: <Box className="me-2" size={18} />,
      label: "Sản phẩm",
      onclick: () => navigate("/admin/products"),
    },
    {
      paths: ["/admin/users"],
      icon: <People className="me-2" size={18} />,
      label: "Người dùng",
      onclick: () => navigate("/admin/users"),
    },
    {
      paths: ["/logout"],
      icon: <BoxArrowRight className="me-2" size={18} />,
      label: "Đăng xuất",
      onclick: async () => {
        await logout();
        dispatch(logoutUser());
        navigate("/");
      },
    },
  ];
  const activeRoute = location.pathname;
  const getisActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else if (
      activeRoute.includes("/admin/order-detail") &&
      paths.includes("/admin/order-detail")
    ) {
      return true;
    } else if (
      activeRoute.includes("/admin/edit-product") &&
      paths.includes("/admin/edit-product")
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className="d-flex">
        <div
          className="border-end text-white"
          style={{
            width: "250px",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
            backgroundColor: "#3d464d",
          }}
        >
          <div className="p-3">
            <h3 className="text-purple">Spodut</h3>
          </div>

          <Nav className="flex-column p-3">
            {menuItems.map((item) => (
              <Nav.Link
                className={`d-flex align-items-center py-2 fs-6 ${
                  getisActiveOrNot(item.paths) ? "text-danger" : "text-white"
                }`}
                onClick={item.onclick}
              >
                {item.icon}
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>

        <div
          className="flex-grow-1"
          style={{
            paddingLeft: "250px",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Navbar bg="white" className="border-bottom">
            <Container fluid>
              <Nav className="ms-auto">
                <Nav.Link>
                  <Bell size={20} />
                </Nav.Link>
                <Nav.Link>
                  <img
                    src={user.avatar}
                    alt="admin-avatar"
                    className="rounded-circle bg-secondary"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          {/* Main Content */}
          <Container fluid className="p-4">
            {children}
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
