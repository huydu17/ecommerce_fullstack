import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CategoryFilter({
  categories,
  categoryChoosen,
  setCategoryChoosen,
  setAttrsFromFilter,
}) {
  const navigate = useNavigate();
  return (
    <>
      <h6>
        <b>Danh mục</b>
      </h6>
      <Form>
        {categories.length > 0 &&
          categories.map((item) => (
            <div className="mb-1" key={item._id}>
              <Form.Check
                type="radio"
                id={`category-${item._id}`}
                name="category"
              >
                <Form.Check.Input
                  type="radio"
                  checked={categoryChoosen === item.name}
                  onChange={() => {
                    setCategoryChoosen(item.name);
                    setAttrsFromFilter([]);
                    navigate("/product-list");
                  }}
                />
                <Form.Check.Label style={{ cursor: "pointer" }}>
                  {item.name}
                </Form.Check.Label>
              </Form.Check>
            </div>
          ))}
      </Form>
    </>
  );
}

export default CategoryFilter;
