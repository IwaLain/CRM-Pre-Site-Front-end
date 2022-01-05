import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

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
          <Button className="ui-btn ui-btn-secondary" onClick={toggleModal}>Cancel</Button>
          <Button className="ui-btn ui-btn-primary" onClick={handleConfirmModalFormSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ConfirmModal;
