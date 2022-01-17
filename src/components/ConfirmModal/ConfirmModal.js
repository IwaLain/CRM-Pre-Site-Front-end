import React, { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { GlobalContext } from "../../context";

const ConfirmModal = ({
  modal,
  toggleModal,
  handleSubmit,
  title,
  modalText,
}) => {
    const { submitPreventer } = useContext(GlobalContext)

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
          <button className="ui-btn ui-btn-secondary" onClick={toggleModal}>
            Cancel
          </button>
          <button
          disabled={submitPreventer}
            className="submit-btn ui-btn ui-btn-primary"
            onClick={handleConfirmModalFormSubmit}
          >
            {submitPreventer ? '...' : 'Submit'}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ConfirmModal;
