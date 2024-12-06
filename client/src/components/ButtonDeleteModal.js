import React from "react";
import { Modal, Button } from "react-bootstrap";

const ButtonDeleteModal = ({
  show,
  handleClose,
  handleDelete,
  itemToDelete,
  itemType,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100"></Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa {itemType} này không?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Huỷ
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await handleDelete(itemToDelete);
            handleClose();
          }}
        >
          Xoá
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ButtonDeleteModal;
