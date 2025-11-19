import React, { useEffect, useState } from "react";
import { Card, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Table, Tag } from "antd";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../apicalls/category";
import SuccessToast from "../../components/common/SuccessToast";
import ErrorToast from "../../components/common/ErrorToast";
import Loading from "../../components/Loading";
function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [categorySelected, setCategorySelected] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalEditCategoryShow, setModalEditCategoryShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories(signal);
        if (response.data) {
          const formattedCategories = response.data.map((category, index) => ({
            ...category,
            index: index + 1,
            key: category._id,
            totalProducts: category?.totalProducts
              ? category.totalProducts + " sản phẩm"
              : "Chưa có sản phẩm nào",
          }));
          setCategories(formattedCategories);
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
    fetchCategories();
    return () => {
      if (signal.aborted === false) {
        abortController.abort();
      }
    };
  }, [categoryDeleted, isUpdated, isCreated]);

  const handleCreateOrUpdateCategory = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    try {
      const categoryId = categorySelected?._id;
      const name = form.category.value;
      const description = form.description.value;
      const icon = form.icon.value;
      const data = {
        name,
        description,
        icon,
      };
      try {
        let response;
        if (isCreated) {
          response = await createCategory(data);
        } else {
          response = await updateCategory(categoryId, data);
        }
        if (response.error) {
          ErrorToast(response.error);
        } else {
          SuccessToast(response.message);
          isCreated ? setIsCreated(!isCreated) : setIsUpdated(!isUpdated);
          setModalEditCategoryShow(false);
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
      title: "Danh mục",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "25%",
    },
    {
      title: "Icons",
      dataIndex: "icon",
      width: "15%",
      render: (text, record) => (
        <i className={record.icon} style={{ fontSize: "30px" }}></i>
      ),
    },

    {
      title: "Số lượng sản phẩm",
      dataIndex: "totalProducts",
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
              setModalEditCategoryShow(true);
              setCategorySelected(record);
              setIsCreated(false);
            }}
          >
            <i className="bi bi-pencil-square text-white"></i>
          </Button>
          {"  "}
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              setCategoryToDelete(record._id);
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
        show={modalEditCategoryShow}
        onHide={() => setModalEditCategoryShow(false)}
        size="md["
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isCreated ? "Tạo danh mục" : "Chỉnh sửa danh mục"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateOrUpdateCategory}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Danh mục <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="category"
                type="text"
                placeholder="Danh mục"
                required
                defaultValue={categorySelected?.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Mô tả <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="description"
                required
                type="text"
                placeholder="Mô tả"
                defaultValue={categorySelected?.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Icon <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="icon"
                type="text"
                placeholder="Icon"
                required
                defaultValue={categorySelected?.icon}
              />
            </Form.Group>
            {isUpdated && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số lượng sản phẩm</Form.Label>
                <Form.Control
                  name="totalProducts"
                  type="text"
                  placeholder="Số lượng sản phẩm"
                  disabled
                  defaultValue={categorySelected?.totalProducts}
                />
              </Form.Group>
            )}

            <Modal.Footer className="mt-3">
              <Button
                variant="outline-info"
                onClick={() => setModalEditCategoryShow(false)}
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
        <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteCategory(categoryToDelete);
              setCategoryToDelete(null);
              setCategoryDeleted(!categoryDeleted);
              handleClose();
              SuccessToast("Xoá danh mục thành công!");
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        className="mb-2 text-white"
        variant="info"
        onClick={() => {
          setModalEditCategoryShow(true);
          setIsCreated(true);
        }}
      >
        <i className="bi bi-plus-circle"></i> Thêm danh mục
      </Button>
      <Card>
        <div className="p-3">
          <Table
            columns={columns}
            dataSource={categories}
            pagination={{
              pageSize: 10,
            }}
          />
        </div>
      </Card>
    </>
  );
}

export default AdminCategory;
