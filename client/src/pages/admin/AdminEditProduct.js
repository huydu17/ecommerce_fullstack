import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  CloseButton,
  Container,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { saveAttribute } from "../../redux/slices/categorySlice";
import {
  addAttribute,
  attributeValueSelected,
  changeCategory,
  deleteAttribute,
  handleUploadImages,
  removePreviewImage,
  setValueForKey,
} from "./utils/utils";
import { get, updateProduct } from "../../apicalls/product";
import ErrorToast from "../../components/common/ErrorToast";
import SuccessToast from "../../components/common/SuccessToast";
import BackButton from "../../components/common/BackButton";

const AdminEditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState({
    success: "",
    error: "",
    isLoading: false,
  });
  const [modified, setModified] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryChoosen, setCategoryChoosen] = useState("");
  const [description, setDescription] = useState(product?.description || "");
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
  const [displayRowAttribute, setDisplayRowAttribute] = useState(false);
  const [attributesForTable, setAttributesForTable] = useState([]);
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const attrKey = useRef(null);
  const attrValue = useRef(null);
  const categories = useSelector((state) => state.category.categories);
  const { productId } = useParams();
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await get(productId);
      if (response?.data) {
        setProduct(response.data);
        setCategoryChoosen(response.data?.category?.name);
        setAttributesForTable(response.data.attributes);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 150);
    }
  };

  useEffect(() => {
    if (categories?.length > 0) {
      const categoryOfEditProduct = categories.find(
        (item) => item.name === product?.category?.name
      );
      if (
        categoryOfEditProduct &&
        categoryOfEditProduct.attributes.length > 0
      ) {
        setAttributesFromDb(categoryOfEditProduct.attributes);
      }
    }
  }, [product, categories]);
  useEffect(() => {
    fetchProduct();
  }, [productId, modified]);
  const handleEditorChange = (content) => {
    setDescription(content);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append("images", file);
      });
      formData.append("name", form.elements.name.value);
      formData.append("price", form.elements.price.value);
      formData.append("totalQty", form.elements.totalQty.value);
      formData.append("shortDescription", form.elements.shortDescription.value);
      formData.append("description", description);
      formData.append("category", categoryChoosen);
      formData.append("attributes", JSON.stringify(attributesForTable));
      formData.append("remainingImages", JSON.stringify(product.images));
      setUpdateState({ ...updateState, isLoading: true });
      try {
        const response = await updateProduct(product._id, formData);
        if (response.error) {
          setUpdateState({
            ...updateState,
            error: response.error,
            isLoading: false,
          });
          ErrorToast(response.error);
        } else {
          setModified(true);
          setDisplayRowAttribute(false);
          setNewAttribute({ key: "", value: "" });
          attributesForTable?.length > 0 &&
            attributesForTable.forEach((attr) => {
              dispatch(
                saveAttribute({
                  categoryChoosen: categoryChoosen,
                  key: attr.key,
                  value: attr.value,
                })
              );
            });
          navigate("/admin/products");
          setUpdateState({
            ...updateState,
            success: response.message,
            isLoading: false,
          });
          SuccessToast(response.success);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onCancle = () => {
    setModified(false);
    setDisplayRowAttribute(false);
    setNewAttribute({ key: "", value: "" });
  };
  const addAttributeRow = () => {
    setDisplayRowAttribute(true);
  };
  const deleteImage = (imageId) => {
    setProduct((item) => {
      return {
        ...item,
        images: item.images.filter((img) => img._id !== imageId),
      };
    });
  };
  useEffect(() => {
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [previewImages]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <BackButton />
          <Card className="shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 py-2">Chỉnh Sửa Sản Phẩm</h5>
                  <div className="d-flex gap-2">
                    {modified ? (
                      <>
                        <Button variant="outline-secondary" onClick={onCancle}>
                          Hủy
                        </Button>
                        <Button
                          variant="info"
                          type="submit"
                          className="text-white"
                          disabled={updateState.isLoading}
                        >
                          {updateState.isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Lưu thay đổi
                            </>
                          ) : (
                            "Lưu thay đổi"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="text-white"
                        variant="info"
                        onClick={() => setModified(true)}
                      >
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={7}>
                    <Card className="mb-4">
                      <Card.Header className="bg-white">
                        <h6 className="mb-0">Thông Tin Chung</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Tên sản phẩm <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="name"
                            placeholder="Nhập tên sản phẩm"
                            defaultValue={product?.name || ""}
                            disabled={!modified}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            Mô tả ngắn <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            name="shortDescription"
                            placeholder="Nhập mô tả ngắn"
                            defaultValue={product?.shortDescription || ""}
                            disabled={!modified}
                          />
                        </Form.Group>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Giá bán<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                name="price"
                                placeholder="Nhập giá bán"
                                defaultValue={product?.price || ""}
                                disabled={!modified}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Tổng số lượng
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                name="totalQty"
                                placeholder="Nhập số lượng"
                                defaultValue={product?.totalQty || ""}
                                disabled={!modified}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4}>
                            <Form.Group>
                              <Form.Label>Đã bán</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="0"
                                disabled
                                defaultValue={product.totalSold}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={4}>
                            <Form.Group>
                              <Form.Label>Số lượng đánh giá</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="0"
                                disabled
                                defaultValue={product.totalReviews}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={4}>
                            <Form.Group>
                              <Form.Label>Điểm trung bình</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="0"
                                disabled
                                defaultValue={product.averageRating}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    <Card className="mb-4">
                      <Card.Header className="bg-white">
                        <h6 className="mb-0">
                          Mô tả chi tiết <span className="text-danger">*</span>
                        </h6>
                      </Card.Header>
                      <Card.Body>
                        <Row className="g-3 mb-3">
                          <Editor
                            apiKey="13uc0fv8mr1svucgzy67yw3f984ys2owii8ka24ewek8i2tx"
                            init={{
                              plugins:
                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                              toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                            }}
                            initialValue={product?.description || ""}
                            disabled={!modified}
                            name="description"
                            onEditorChange={handleEditorChange}
                          />
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={5}>
                    {/* Phân loại */}
                    <Card className="mb-4">
                      <Card.Header className="bg-white">
                        <h6 className="mb-0">
                          Phân Loại <span className="text-danger">*</span>
                        </h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Danh mục<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            required
                            disabled={!modified}
                            onChange={(e) =>
                              changeCategory(
                                e,
                                categories,
                                setCategoryChoosen,
                                setAttributesFromDb
                              )
                            }
                            name="category"
                          >
                            {product?.category?.name ? (
                              <option value={product.category.name} selected>
                                {product.category.name}
                              </option>
                            ) : (
                              <option value="">Chọn danh mục</option>
                            )}
                            {categories
                              .filter(
                                (category) =>
                                  !product?.category ||
                                  category._id !== product.category._id
                              )
                              .map((category, idx) => (
                                <option key={idx} value={category.name}>
                                  {category.name}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                    {/* Thuộc tính */}
                    <Card className="mb-4">
                      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Thuộc Tính Sản Phẩm</h6>
                      </Card.Header>
                      <Card.Body>
                        {modified && attributesFromDb.length > 0 && (
                          <Row className="mb-2">
                            <Col md={4}>
                              <Form.Select
                                aria-label="Default select example"
                                ref={attrKey}
                                onChange={(e) =>
                                  setValueForKey(e, attributesFromDb, attrValue)
                                }
                              >
                                <option>Chọn thuộc tính</option>
                                {attributesFromDb.map((attr, index) => (
                                  <option key={index} value={attr.key}>
                                    {attr.key}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                            <Col md={4}>
                              <Form.Select
                                aria-label="Default select example"
                                ref={attrValue}
                                onChange={(e) =>
                                  attributeValueSelected(
                                    e,
                                    attrKey,
                                    setAttributesForTable
                                  )
                                }
                              >
                                <option>Chọn giá trị</option>
                              </Form.Select>
                            </Col>
                            <Col md={3}>
                              {modified && (
                                <div className="mb-2 d-flex justify-content-end">
                                  <Button
                                    variant="outline-info"
                                    onClick={addAttributeRow}
                                  >
                                    <i className="bi bi-plus-circle"></i>{" "}
                                    <small>Thêm</small>
                                  </Button>
                                </div>
                              )}
                            </Col>
                          </Row>
                        )}
                        <Table
                          bordered
                          hover
                          responsive
                          className="align-middle"
                        >
                          <thead className="bg-light">
                            <tr>
                              <th>Tên thuộc tính</th>
                              <th>Giá trị</th>
                              <th
                                className="text-center"
                                style={{ width: "80px" }}
                              >
                                Xóa
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {attributesForTable &&
                              attributesForTable.map((attr, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <Form.Control
                                      size="sm"
                                      type="text"
                                      placeholder="Tên thuộc tính"
                                      value={attr.key || ""}
                                      disabled
                                    />
                                  </td>
                                  <td>
                                    <Form.Control
                                      size="sm"
                                      type="text"
                                      placeholder="Giá trị"
                                      value={attr.value || ""}
                                      disabled
                                    />
                                  </td>
                                  <td className="text-center">
                                    <CloseButton
                                      disabled={!modified}
                                      onClick={() =>
                                        deleteAttribute(
                                          attr.key,
                                          setAttributesForTable
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}

                            {displayRowAttribute && (
                              <tr>
                                <td>
                                  <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Tên thuộc tính"
                                    value={newAttribute.key}
                                    onChange={(e) =>
                                      setNewAttribute({
                                        ...newAttribute,
                                        key: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Giá trị"
                                    value={newAttribute.value}
                                    onChange={(e) =>
                                      setNewAttribute({
                                        ...newAttribute,
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td className="text-center">
                                  <i
                                    className="bi bi-check-lg"
                                    style={{
                                      fontSize: "25px",
                                      color: "rgb(137 135 135)",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      addAttribute(
                                        newAttribute,
                                        setAttributesForTable,
                                        setNewAttribute,
                                        setDisplayRowAttribute
                                      )
                                    }
                                  ></i>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                    <Card className="mb-4">
                      <Card.Header className="bg-white">
                        <h6 className="mb-0">
                          Hình Ảnh Sản Phẩm{" "}
                          <span className="text-danger">*</span>
                        </h6>
                      </Card.Header>
                      <Card.Body>
                        <Row className="g-3 mb-3">
                          {product?.images &&
                            product.images.map((img, idx) => (
                              <Col
                                xs={6}
                                md={3}
                                key={idx}
                                className="position-relative"
                              >
                                <img
                                  src={img.url}
                                  alt=""
                                  className="img-fluid rounded border"
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "5px",
                                  }}
                                  disabled={!modified}
                                  onClick={() => deleteImage(img.id)}
                                >
                                  ×
                                </Button>
                              </Col>
                            ))}
                          {modified &&
                            previewImages.map((img, idx) => (
                              <Col
                                xs={6}
                                md={3}
                                key={`preview-${idx}`}
                                className="position-relative"
                              >
                                <img
                                  src={img.url}
                                  alt={img.name}
                                  className="img-fluid rounded border"
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "5px",
                                  }}
                                  onClick={() =>
                                    removePreviewImage(
                                      idx,
                                      setPreviewImages,
                                      setSelectedFiles
                                    )
                                  }
                                >
                                  ×
                                </Button>
                              </Col>
                            ))}
                        </Row>
                        {modified && (
                          <Form.Control
                            type="file"
                            multiple
                            onChange={(e) =>
                              handleUploadImages(
                                e,
                                setSelectedFiles,
                                setPreviewImages,
                                fileInputRef
                              )
                            }
                            ref={fileInputRef}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Form>
          </Card>
        </Container>
      )}
    </>
  );
};

export default AdminEditProduct;
