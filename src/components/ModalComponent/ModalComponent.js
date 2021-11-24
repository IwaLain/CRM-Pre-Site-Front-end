import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import FacilityCreate from "../pages/FacilityCreate/FacilityCreate";
import CustomerCreate from "../pages/CustomerCreate/CustomerCreate";

const ModalComponent = ({ title, toggle, modal }) => {
  const [FormComponent, setFormComponent] = useState();
  useEffect(() => {
    setFormComponent(<FacilityCreate />);
  });

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{FormComponent}</ModalBody>
      <ModalFooter>
        <FormGroup md={12} className="formUser__buttons">
          <Col md={6}>
            <Button
              className="formUser__cancel"
              onClick={(e) => {
                e.preventDefault();
                toggle();
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col md={6}>
            <Button
              className="formUser__submit"
              onClick={(e) => {
                e.preventDefault();
                toggle();
              }}
            >
              Submit
            </Button>
          </Col>
        </FormGroup>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
