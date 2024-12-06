import React from "react";
import { Button, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { changePassword, changePasswordWithGoogle } from "../../apicalls/auth";
import { useSelector } from "react-redux";
function UserChangePassword() {
  const user = useSelector((state) => state.user.userInfo);
  const [validated, setValidated] = useState(false);
  const [updateState, setUpdateState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const [matchPassword, setMatchPassword] = useState(true);
  const handlePasswordMatch = () => {
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
    const oldPassword = form.oldPassword?.value || "";
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    const dataUpdate = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    console.log(dataUpdate);
    if (
      event.currentTarget.checkValidity() === true &&
      newPassword &&
      confirmPassword
    ) {
      setUpdateState({ ...updateState, isLoading: true });
      try {
        let response;
        if (user.googleId) {
          response = await changePasswordWithGoogle(dataUpdate);
        } else {
          response = await changePassword(dataUpdate);
        }
        if (response.error) {
          setUpdateState({
            ...updateState,
            error: response.error,
            isLoading: false,
          });
          setTimeout(() => {
            setUpdateState({ ...updateState, error: "" });
          }, 2000);
        } else {
          setUpdateState({
            ...updateState,
            success: response.message,
            isLoading: false,
          });
          setTimeout(() => {
            setUpdateState({ ...updateState, success: "" });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUpdateState({ ...updateState, isLoading: false });
    }
    setValidated(true);
  };
  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Col md={6}>
            {updateState.error && (
              <Alert
                variant="danger"
                onClose={() => setUpdateState({ ...updateState, success: "" })}
              >
                {updateState.error}
              </Alert>
            )}
            {updateState.success && (
              <Alert
                variant="success"
                onClose={() => setUpdateState({ ...updateState, success: "" })}
              >
                {updateState.success}
              </Alert>
            )}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {!user?.googleId && (
                <Form.Group className="mb-3" controlId="formOldPassword">
                  <Form.Label>
                    Mật khẩu hiện tại<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="password" name="oldPassword" />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập mật khẩu
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>
                  Mật khẩu<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control required type="password" name="newPassword" />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập lại mật khẩu
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmNewPassword">
                <Form.Label>
                  Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  onChange={handlePasswordMatch}
                  isInvalid={!matchPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {matchPassword
                    ? "Vui lòng nhập lại mật khẩu"
                    : "Mật khẩu không trùng khớp"}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid">
                <Button variant="danger" type="submit">
                  {updateState.isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang cập nhật...
                    </>
                  ) : (
                    "Xác nhận"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default UserChangePassword;
