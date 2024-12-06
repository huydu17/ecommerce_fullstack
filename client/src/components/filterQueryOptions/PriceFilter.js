import React from "react";
import { Button, Form } from "react-bootstrap";
function PriceFilter({
  priceFromFilter,
  setPriceFromFilter,
  setApplyPriceRange,
}) {
  const handleSetPrice = () => {
    setApplyPriceRange({
      min: priceFromFilter?.min,
      max: priceFromFilter?.max,
    });
  };
  return (
    <>
      <h6>
        <b>Khoảng giá</b>
      </h6>
      <div className="d-flex gap-2 mb-2">
        <Form.Control
          style={{ width: "50%" }}
          type="text"
          placeholder="₫ TỪ"
          onChange={(e) =>
            setPriceFromFilter({ ...priceFromFilter, min: e.target.value })
          }
        />
        <Form.Control
          style={{ width: "50%" }}
          type="text"
          placeholder="₫ ĐẾN"
          onChange={(e) =>
            setPriceFromFilter({
              ...priceFromFilter,
              max: e.target.value,
            })
          }
        />
      </div>
      <Button variant="danger" className="btn-reset" onClick={handleSetPrice}>
        Áp dụng
      </Button>
    </>
  );
}

export default PriceFilter;
