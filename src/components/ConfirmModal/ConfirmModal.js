import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Button,
} from "reactstrap";
import "./confirmModal.scss";
const ConfirmModal = ({
  modal,
  toggleModal,
  handleSubmit,
  title,
  modalText,
}) => {
  const handleConfirmModalFormSubmit = async (e) => {
    e.preventDefault();
    // unregister(removeField.id);
    // setFields(fields.filter((field) => field.id !== removeField.id));
    // setRemoveField("");
    handleSubmit();
    toggleModal();
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>{title && title}</ModalHeader>
        <ModalBody>
          {modalText && <p className="confirm-modal--text ">{modalText}</p>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>Cancel</Button>
          <Button onClick={handleConfirmModalFormSubmit} color="primary">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ConfirmModal;
