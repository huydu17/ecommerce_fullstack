import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { forgotPassword } from "../apicalls/auth";
import Breadcrumb from "../components/common/Breadcrumb";
function ForgotPassword() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sendCodeState, setSendCodeState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    setSendCodeState({ ...sendCodeState, isLoading: true });
    if (event.currentTarget.checkValidity() === true && email) {
      const response = await forgotPassword(email);
      console.log(response);
      if (response.error) {
        setSendCodeState({
          ...sendCodeState,
          error: response.error,
        });
      } else {
        setSendCodeState({
          ...sendCodeState,
          success: response.message,
        });
      }
    } else {
      setSendCodeState({ ...sendCodeState, isLoading: false });
    }
    setValidated(true);
  };

  const handleEmailChange = (event) => {
    setEmailError(validateEmail(event.target.value));
  };
  return (
    <>
      <Breadcrumb items={[{ home: true }, { label: "Quên mật khẩu" }]} />
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                {sendCodeState?.error && (
                  <Alert variant="danger">{sendCodeState.error}</Alert>
                )}
                {sendCodeState?.success && (
                  <Alert variant="success">{sendCodeState.success}</Alert>
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

export default ForgotPassword;
