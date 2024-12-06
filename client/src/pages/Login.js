import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../apicalls/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import ErrorToast from "../components/common/ErrorToast";
import Breadcrumb from "../components/common/Breadcrumb";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [loginState, setLoginState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    const emailOrUsername = form.emailOrUsername.value;
    const password = form.password.value;
    setLoginState({ ...loginState, isLoading: true });
    if (
      event.currentTarget.checkValidity() === true &&
      emailOrUsername &&
      password
    ) {
      const response = await loginUser({ emailOrUsername, password });
      if (response.error) {
        setLoginState({
          ...loginState,
          error: response.error,
          isLoading: false,
        });
      } else {
        response.user.role === "admin"
          ? window.location.assign("/admin/dashboard")
          : window.location.assign("/");
        response.user && dispatch(setUser(response.user));
        setLoginState({
          error: "",
          success: response.message,
          isLoading: false,
        });
      }
    } else {
      setLoginState({ ...loginState, isLoading: false });
    }
    setValidated(true);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        if (res.data) {
          const response = await loginWithGoogle(res.data);
          if (response.error) {
            ErrorToast(response.error);
          } else {
            window.location.assign("/");
            response.user && dispatch(setUser(response.user));
          }
        }
      } catch (error) {
        console.error(error);
        ErrorToast("Google login failed!");
      }
    },
  });
  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Đăng nhập" }]} />
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Đăng nhập</h2>
                {loginState?.error && (
                  <Alert variant="danger">{loginState.error}</Alert>
                )}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      required
                      placeholder="Email hoặc tài khoản"
                      name="emailOrUsername"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập email hoặc tài khoản
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Mật khẩu"
                      minLength={6}
                      name="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập mật khẩu hợp lệ (tối thiểu 6 ký tự)
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="mb-1 text-end">
                    <Link
                      to="/forgot-password"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      Quên mật khẩu ?
                    </Link>
                  </div>
                  <div className="d-grid">
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={loginState.isLoading}
                    >
                      {loginState.isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đăng nhập
                        </>
                      ) : (
                        "Đăng nhập"
                      )}
                    </Button>
                  </div>
                </Form>
                <p className="text-center mt-2">Hoặc</p>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={() => login()}
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      border: "1px solid #ebdfdf",
                    }}
                  >
                    <span className="p-2">
                      <img
                        src="./images/google.png"
                        alt="google-button"
                        width={30}
                        height={30}
                      />{" "}
                      Đăng nhập với Google
                    </span>
                  </button>
                </div>
                <p className="text-center mt-4 mb-0">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    Đăng ký
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
