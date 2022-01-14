import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, button } from "reactstrap";

const ConfirmModal = ({
  modal,
  toggleModal,
  handleSubmit,
  title,
  modalText,
  name,
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
          {modalText && <p className="confirm-modal--text ">{modalText}</p>}{" "}
          {name && (
            <p className="confirm-modal--text ">{`Are you sure you want DELETE ${name}?`}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <button className="ui-btn ui-btn-secondary" onClick={toggleModal}>
            Cancel
          </button>
          <button
            className="ui-btn ui-btn-primary"
            onClick={handleConfirmModalFormSubmit}
          >
            Submit
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ConfirmModal;
