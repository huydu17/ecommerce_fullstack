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
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { resetPassword } from "../apicalls/auth";
import SuccessToast from "../components/common/SuccessToast";
import Breadcrumb from "../components/common/Breadcrumb";
function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [matchPassword, setMatchPassword] = useState(true);
  const [sendCodeState, setSendCodeState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const onChange = () => {
    const newPassword = document.querySelector("input[name=newPassword]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    setMatchPassword(confirmPassword.value === newPassword.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    setSendCodeState({ ...sendCodeState, isLoading: true });
    const payload = {
      newPassword,
      confirmPassword,
    };

    if (
      event.currentTarget.checkValidity() === true &&
      newPassword &&
      confirmPassword
    ) {
      const response = await resetPassword(token, payload);
      if (response.error) {
        setSendCodeState({
          ...sendCodeState,
          error: response.error,
        });
      } else {
        navigate("/login");
        SuccessToast(response.message);
      }
    } else {
      setSendCodeState({ ...sendCodeState, isLoading: false });
    }
    setValidated(true);
  };

  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Đặt lại mật khẩu" }]} />
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                {sendCodeState?.error && (
                  <Alert variant="danger">{sendCodeState.error}</Alert>
                )}
                <div className="position-relative d-flex align-items-center mb-4">
                  <IoMdArrowRoundBack
                    size={30}
                    className="position-absolute"
                    color="red"
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="w-100 text-center">
                    <h2 className="mb-0">Đặt lại mật khẩu</h2>
                  </div>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      type="password"
                      placeholder="Mật khẩu"
                      minLength={8}
                      name="newPassword"
                    />
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
                      disabled={sendCodeState.isLoading}
                    >
                      {sendCodeState.isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Gửi
                        </>
                      ) : (
                        "Gửi"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ResetPassword;
