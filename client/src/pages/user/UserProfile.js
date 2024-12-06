import React, { useEffect, useState } from "react";
import { Row, Card, Col, Form, Button, Alert } from "react-bootstrap";
import { getMe, updateInfo } from "../../apicalls/user";
import { validatePhoneNumber } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

function UserProfile() {
  const [validated, setValidated] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initialUser, setInitialUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    apartment: "",
    ward: "",
    district: "",
    province: "",
    userName: "",
    email: "",
  });
  const [updateState, setUpdateState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const response = await getMe();
      if (response.data) {
        setUserInfo(response.data);
        setInitialUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (initialUser) {
      const hasChanged = Object.keys(userInfo).some((key) => {
        const editableFields = [
          "firstName",
          "lastName",
          "phoneNumber",
          "apartment",
          "ward",
          "district",
          "province",
        ];
        return (
          editableFields.includes(key) && userInfo[key] !== initialUser[key]
        );
      });
      setIsFormChanged(hasChanged);
    }
  }, [userInfo, initialUser]);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    setUserInfo({ ...userInfo, phoneNumber: event.target.value });
    setPhoneNumberError(validatePhoneNumber(event.target.value));
  };
  const {
    firstName,
    lastName,
    phoneNumber,
    apartment,
    ward,
    district,
    province,
  } = userInfo;
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (
      form.checkValidity() === true &&
      firstName &&
      lastName &&
      phoneNumber &&
      apartment &&
      ward &&
      district &&
      province
    ) {
      setUpdateState({ ...updateState, isLoading: true });
      const dataUpdate = {
        firstName,
        lastName,
        phoneNumber,
        apartment,
        ward,
        district,
        province,
      };
      const response = await updateInfo(dataUpdate);
      if (response.error) {
        setUpdateState({
          ...updateState,
          error: response.error,
          isLoading: false,
        });
      } else {
        setValidated(false);
        dispatch(setUser(response.data));
        setUpdateState({
          error: "",
          success: response.message,
          isLoading: false,
        });
        setTimeout(() => {
          setUpdateState({ ...updateState, success: "" });
        }, 2000);
        await fetchUser();
        setIsFormChanged(false);
      }
    } else {
      setUpdateState({ ...updateState, isLoading: false });
    }
    setValidated(true);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col md={8}>
              {updateState.success && (
                <Alert
                  variant="success"
                  onClose={() =>
                    setUpdateState({ ...updateState, success: "" })
                  }
                >
                  {updateState.success}
                </Alert>
              )}
              {userInfo && (
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>
                      Tên đăng nhập <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      defaultValue={userInfo.userName}
                      style={{ backgroundColor: "#efefef" }}
                      readOnly
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>
                          Họ <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nhập họ"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập họ
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>
                          Tên <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nhập tên"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập tên
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>
                      Email <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      defaultValue={userInfo.email}
                      style={{ backgroundColor: "#efefef" }}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>
                      Số điện thoại <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Số điện thoại"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      isInvalid={phoneNumberError}
                    />
                    <Form.Control.Feedback type="invalid">
                      Số điện thoại không hợp lệ
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formApartment">
                    <Form.Label>
                      Số nhà, chung cư <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Số nhà, chung cư"
                      name="apartment"
                      value={apartment}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập số nhà, chung cư
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formWard">
                        <Form.Label>
                          Phường/Xã <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Phường/Xã"
                          name="ward"
                          value={ward}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập phường/xã
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formDistrict">
                        <Form.Label>
                          Quận/Huyện <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Quận/Huyện"
                          name="district"
                          value={district}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập quận/huyện
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formProvince">
                        <Form.Label>
                          Tỉnh/Thành Phố <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Tỉnh/Thành Phố"
                          name="province"
                          value={province}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập tỉnh/thành phố
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid">
                    <Button
                      variant="danger"
                      type="submit"
                      disabled={updateState.isLoading || !isFormChanged}
                    >
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
                        "Lưu thông tin"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserProfile;
