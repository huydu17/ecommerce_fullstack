import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Table, Tag } from "antd";
import { LinkContainer } from "react-router-bootstrap";
import { deleteProduct, getAll } from "../../apicalls/product";
import { convertToVnd } from "../../utils/ConvertToVnd";
import Loading from "../../components/Loading";
import SuccessToast from "../../components/common/SuccessToast";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productDeleted, setProductDeleted] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAll(signal);
        if (response.data) {
          const formattedProducts = response.data.map((product, index) => ({
            ...product,
            index: index + 1,
            key: product._id,
            price: convertToVnd(product.price),
            images: product?.images[0]?.url,
            category: product?.category?.name || "",
            status:
              product.totalQty > product.totalSold ? "Còn hàng" : "Hết hàng",
          }));
          setProducts(formattedProducts);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") {
          console.error("API call aborted");
        } else {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
    return () => {
      if (signal.aborted === false) {
        abortController.abort();
      }
    };
  }, [productDeleted]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: "5%",
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      width: "30%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{text}</div>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
    },
    {
      title: "Số lượng bán",
      dataIndex: "totalSold",
      width: "15%",
      render: (text, record) => <div>{text} sản phẩm</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      render: (text, record) => (
        <Tag color={record.status === "Còn hàng" ? "green" : "red"}>{text}</Tag>
      ),
    },
    {
      title: "",
      width: "15%",
      render: (text, record) => (
        <div className="flex gap-5">
          <LinkContainer to={`/admin/edit-product/${record._id}`}>
            <Button size="sm" variant="info">
              <i className="bi bi-pencil-square text-white"></i>
            </Button>
          </LinkContainer>
          {"  "}
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              setProductToDelete(record.key);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100">
                Xác nhận xóa
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xoá sản phẩm này không?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  await deleteProduct(productToDelete);
                  setProductToDelete(null);
                  setProductDeleted(!productDeleted);
                  handleClose();
                  SuccessToast("Xoá sản phẩm thành công!");
                }}
              >
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
          <LinkContainer to={"/admin/create-product"}>
            <Button className="mb-2 text-white" variant="info">
              <i className="bi bi-plus-circle"></i> Thêm sản phẩm
            </Button>
          </LinkContainer>
          <Card>
            <div className="p-3">
              <Table
                columns={columns}
                dataSource={products}
                pagination={{
                  pageSize: 8,
                }}
              />
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default AdminProducts;
