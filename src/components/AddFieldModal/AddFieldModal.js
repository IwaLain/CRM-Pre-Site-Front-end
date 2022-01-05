import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Label,
  button,
} from "reactstrap";
const AddFieldModal = ({ modal, toggle, addFieldHandler }) => {
  const [newField, setNewField] = useState("");
  const [showError, setShowError] = useState(false);
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Label for="newFieldTitle">new Field Title</Label>
          <Input
            id="newFieldTitle"
            onChange={(e) => {
              setNewField(e.target.value);
            }}
          ></Input>
          {showError && (
            <small className="text-danger validation-error">
              {"field is required"}
            </small>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            className="ui-btn ui-btn-primary"
            onClick={() => {
              if (newField === "") {
                setShowError(true);
                return;
              }
              addFieldHandler(newField);
              toggle();
              setShowError(false);
              setNewField("");
            }}
          >
            Add Field
          </button>
          <button
            className="ui-btn ui-btn-secondary"
            onClick={() => {
              toggle();
              setNewField("");
              setShowError(false);
            }}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddFieldModal;
