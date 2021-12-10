import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./../../scss/confirmModal.scss";
const ConfirmModal = ({
  modal,
  toggleModal,
  handleSubmit,
  title,
  modalText,
}) => {
  const handleConfirmModalFormSubmit = async (e) => {
    e.preventDefault();
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
