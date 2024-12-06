import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="loading-overlay">
      <Spinner animation="border" role="status" className="text-white">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
