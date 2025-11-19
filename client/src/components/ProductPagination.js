import React from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
function ProductPagination({ page, totalPages, categoryName, searchQuery }) {
  const navigate = useNavigate();
  const handlePagination = (e) => {
    const category = categoryName ? `/category/${categoryName}` : "";
    const search = searchQuery ? `&search=${searchQuery}` : "";
    navigate(`/product-list${category}?page=${e}${search}`);
  };
  return (
    <>
      {totalPages !== 0 && (
        <div className="mt-3">
          <Pagination
            align="center"
            current={page}
            total={totalPages * 10}
            onChange={handlePagination}
          />
        </div>
      )}
    </>
  );
}

export default ProductPagination;
