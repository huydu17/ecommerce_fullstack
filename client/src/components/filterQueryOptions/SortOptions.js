import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "antd";
function SortOptions({ setSortOptions, resetFilters }) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h6>
          <b>Lọc theo</b>
        </h6>
        <Button color="danger" variant="link" onClick={resetFilters}>
          <span className="fw-medium fs-6 mb-3">Xoá tất cả</span>
        </Button>
      </div>
      <div className="d-flex gap-3">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSortOptions(e.target.value)}
        >
          <option>Sắp xếp</option>
          <option value="price">Giá: Thấp đến cao</option>
          <option value="-price">Giá: Cao đến thấp</option>
          <option value="name">Tên: A-Z</option>
          <option value="-name">Tên: Z-A</option>
        </Form.Select>
      </div>
    </>
  );
}

export default SortOptions;
