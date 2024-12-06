import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
function Star({ stars }) {
  return Array.from({ length: 5 }).map((_, idx) => {
    let number = idx + 0.5;
    return (
      <span key={idx}>
        {stars >= idx + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });
}

export default Star;
