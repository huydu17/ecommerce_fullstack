import React from "react";
import { ListGroup } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function Review({ review }) {
  return (
    <ListGroup.Item>
      {review.user.name} <br />
      <Rating readonly initialValue={4} size={20} /> <br />
      {new Date(review.createdAt).toLocaleDateString()} <br />
      {review.content}
    </ListGroup.Item>
  );
}

export default Review;
