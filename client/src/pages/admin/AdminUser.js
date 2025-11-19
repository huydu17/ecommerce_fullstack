import React, { useEffect, useState } from "react";
import { deleteUser, getAll, updateUserByAdmin } from "../../apicalls/user";
import { Card, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Table, Tag, Switch } from "antd";
import ErrorToast from "../../components/common/ErrorToast";
import SuccessToast from "../../components/common/SuccessToast";
import Loading from "../../components/Loading";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalEditUserShow, setModalEditUserShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchUsers = async (signal) => {
    try {
      setLoading(!loading);
      const response = await getAll(signal);
      if (response.data) {
        const formattedUsers = response.data.map((user, index) => ({
          ...user,
          key: user._id,
          index: index + 1,
          name: `${user.firstName} ${user.lastName}`,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));
        setUsers(formattedUsers);
        setLoading(false);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("API call aborted");
      } else {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchUsers(signal);
    return () => {
      if (signal.aborted === false) {
        abortController.abort();
      }
    };
  }, [userDeleted, isUpdated]);

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    try {
      const userId = userSelected?._id;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const phoneNumber = form.phoneNumber.value;
      const password = form.password.value;
      const role = isAdmin;
      const data = {
        firstName,
        lastName,
        phoneNumber,
        password,
        role,
      };
      try {
        const response = await updateUserByAdmin(userId, data);
        if (response.error) {
          ErrorToast(response.error);
        } else {
          SuccessToast(response.message);
          setIsUpdated(!isUpdated);
          setModalEditUserShow(false);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: "5%",
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      width: "25%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      width: "15%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: "15%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: "15%",
      render: (role) => (
        <Tag color={role === "admin" ? "blue" : "red"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "15%",
    },
    {
      title: "",
      width: "15%",
      render: (text, record) => (
        <div className="flex gap-5">
          <Button
            size="sm"
            variant="info"
            onClick={() => {
              setModalEditUserShow(true);
              if (record.role === "admin") {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
              setUserSelected(record);
            }}
          >
            <i className="bi bi-pencil-square text-white"></i>
          </Button>
          {"  "}
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              setUserToDelete(record.key);
              handleShow();
            }}
          >
            <i className="bi bi-trash text-white" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      {loading && <Loading />}
      <Modal
        show={modalEditUserShow}
        onHide={() => setModalEditUserShow(false)}
        size="md["
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chỉnh sửa người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <Row>
              <Col md={7}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Họ <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="Nhập họ"
                    required
                    defaultValue={userSelected?.firstName}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Tên <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Nhập tên"
                    required
                    defaultValue={userSelected?.lastName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Tài khoản <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Tài khoản"
                disabled
                value={userSelected?.userName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Nhập mô tả"
                disabled
                value={userSelected?.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Số điện thoại <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="phoneNumber"
                type="text"
                placeholder="Nhập số điện thoại"
                required
                defaultValue={userSelected?.phoneNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tạo mớI mật khẩu</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>
            <Switch checked={isAdmin} onChange={(e) => setIsAdmin(e)} /> ADMIN
            <Modal.Footer className="mt-3">
              <Button
                variant="outline-info"
                onClick={() => setModalEditUserShow(false)}
              >
                Đóng
              </Button>
              <Button variant="info" className="text-white" type="submit">
                Lưu
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa người dùng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteUser(userToDelete);
              setUserToDelete(null);
              setUserDeleted(!userDeleted);
              handleClose();
              SuccessToast("Xoá người dùng thành công!");
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Card>
        <div className="p-3">
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            pagination={{
              pageSize: 10,
            }}
          />
        </div>
      </Card>
    </>
  );
}

export default AdminUser;
