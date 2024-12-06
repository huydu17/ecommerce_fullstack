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
import { registerUser } from "../apicalls/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { validateEmail, validatePhoneNumber } from "../utils/validation";
import Breadcrumb from "../components/common/Breadcrumb";

function Register() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [registerState, setRegisterState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const [matchPassword, setMatchPassword] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    setEmailError(validateEmail(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumberError(validatePhoneNumber(event.target.value));
  };

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    setMatchPassword(confirmPassword.value === password.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const phoneNumber = form.phoneNumber.value;

    if (
      event.currentTarget.checkValidity() === true &&
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      matchPassword &&
      phoneNumber
    ) {
      setRegisterState({ ...registerState, isLoading: true });
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });
      if (response.error) {
        setRegisterState({
          ...registerState,
          error: response.error,
          isLoading: false,
        });
      } else {
        window.location.href = "/";
        response.user && dispatch(setUser(response.user));
        setRegisterState({
          error: "",
          success: response.message,
          isLoading: false,
        });
      }
    } else {
      setRegisterState({ ...registerState, isLoading: false });
    }
    setValidated(true);
  };

  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Đăng ký" }]} />

      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4">Đăng ký</h2>
                {registerState?.error && (
                  <Alert variant="danger">{registerState.error}</Alert>
                )}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nhập họ"
                      name="firstName"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập họ
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nhập tên"
                      name="lastName"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập tên
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleEmailChange}
                      isInvalid={emailError}
                    />
                    <Form.Control.Feedback type="invalid">
                      Email không hợp lệ
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Số điện thoại"
                      name="phoneNumber"
                      onChange={handlePhoneNumberChange}
                      isInvalid={phoneNumberError}
                    />
                    <Form.Control.Feedback type="invalid">
                      Số điện thoại không hợp lệ
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      type="password"
                      placeholder="Mật khẩu"
                      minLength={8}
                      name="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập mật khẩu
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Mật khẩu tối thiểu có 8 ký tự
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      name="confirmPassword"
                      onChange={onChange}
                      isInvalid={!matchPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {matchPassword
                        ? "Vui lòng nhập lại mật khẩu"
                        : "Mật khẩu không khớp"}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={registerState.isLoading}
                    >
                      {registerState.isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đăng ký
                        </>
                      ) : (
                        "Đăng ký"
                      )}
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-4 mb-0">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "red" }}
                  >
                    Đăng nhập
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

export default Register;
