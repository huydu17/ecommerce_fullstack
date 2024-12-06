import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
const BackButton = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button variant="danger" className="mb-2" size="sm" onClick={handleGoBack}>
      <small>
        <IoIosArrowBack style={{ marginBottom: "2px" }} />
        Trở về
      </small>
    </Button>
  );
};

export default BackButton;
