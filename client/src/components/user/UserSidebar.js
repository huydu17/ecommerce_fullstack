import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Image,
  NavLink,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Person, Lock, Bag } from "react-bootstrap-icons";
import Breadcrumb from "../common/Breadcrumb";
import { useSelector } from "react-redux";

function UserSidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const menuItems = [
    {
      paths: ["/user/profile"],
      icon: <Person className="me-2" size={18} />,
      label: "Hồ Sơ",
      onclick: () => navigate("/user/profile"),
    },
    {
      paths: ["/user/change-password"],
      icon: <Lock className="me-2" size={18} />,
      label: "Đổi Mật Khẩu",
      onclick: () => navigate("/user/change-password"),
    },
    {
      paths: ["/user/my-orders", "/user/order-details"],
      icon: <Bag className="me-2" size={18} />,
      label: "Đơn Mua",
      onclick: () => navigate("/user/my-orders"),
    },
  ];
  const activeRoute = location.pathname;
  const getisActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/user/order-details") &&
        paths.includes("/user/my-orders")
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      {menuItems.map((item) => {
        if (activeRoute.includes(item.paths[0])) {
          return (
            <Breadcrumb
              items={[
                {
                  home: true,
                },
                {
                  label: item.label,
                },
              ]}
            />
          );
        }
        return "";
      })}
      {activeRoute.includes("/user/order-details/") && (
        <Breadcrumb
          items={[
            {
              home: true,
            },
            {
              label: "Đơn hàng",
              link: "/user/my-orders",
            },
            {
              label: "Chi tiết đơn hàng",
            },
          ]}
        />
      )}
      <Container>
        <Row>
          <Col md={2} className="bg-white shadow-sm p-4">
            <div className="text-center mb-2">
              <Image
                src={user.avatar}
                roundedCircle
                width={60}
                height={60}
                alt="Profile"
              />
              <p>{user.firstName + " " + user.lastName}</p>
            </div>

            <Navbar className="p-0">
              <Nav className="flex-column w-100">
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <NavLink
                      className={`d-flex align-items-center py-2  ${
                        getisActiveOrNot(item.paths) && "text-danger"
                      }`}
                      onClick={item.onclick}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </React.Fragment>
                ))}
              </Nav>
            </Navbar>
          </Col>

          <Col md={10} className="bg-light p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserSidebar;
