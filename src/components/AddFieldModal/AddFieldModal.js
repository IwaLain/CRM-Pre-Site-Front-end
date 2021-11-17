import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Label,
  Button,
} from "reactstrap";
const AddFieldModal = ({ modal, toggle, addFieldHandler }) => {
  const [newField, setNewField] = useState("");
  const [showError, setShowError] = useState(false);
  return (
    <>
      {" "}
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
            <small className="text-danger">{"field is required"}</small>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
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
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              toggle();
              setNewField("");
              setShowError(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddFieldModal;
