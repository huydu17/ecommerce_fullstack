import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Form } from "react-bootstrap";

function RatingFilter({ ratingFromFilter, setRatingFromFilter }) {
  return (
    <>
      <h6>
        <b>Đánh giá</b>
      </h6>
      {Array.from({ length: 5 }).map((_, idx) => {
        const ratingValue = 5 - idx;
        return (
          <div className="rating-filter-container" key={idx}>
            <Form.Check
              type="radio"
              id={`radio-rating-${idx}`}
              name="rating"
              className="rating-filter-container"
            >
              <div className="rating-radio">
                <Form.Check.Input
                  type="radio"
                  checked={ratingFromFilter === ratingValue}
                  onChange={() => setRatingFromFilter(ratingValue)}
                />
                <Form.Check.Label style={{ cursor: "pointer" }}>
                  <Rating readonly size={20} initialValue={ratingValue} />{" "}
                  <small>{idx < 1 ? "" : "trở lên"}</small>
                </Form.Check.Label>
              </div>
            </Form.Check>
          </div>
        );
      })}
    </>
  );
}

export default RatingFilter;
