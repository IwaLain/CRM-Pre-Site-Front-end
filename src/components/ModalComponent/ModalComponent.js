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
import CustomerCreate from "../pages/CustomerCreate/CustomerCreate";
import FacilityCreate from "../pages/FacilityCreate/FacilityCreate";
import LocationCreate from "../pages/LocationCreate/LocationCreate";
import EquipmentCreate from "../pages/EquipmentCreate/EquipmentCreate";

const ModalComponent = ({ toggle, modal, type, mode }) => {
  const [FormComponent, setFormComponent] = useState();
  const [formTitle, setFormTitle] = useState();

  useEffect(() => {
    switch (mode) {
      case "create":
        switch (type.entity) {
          case "customers":
            setFormComponent(<CustomerCreate />);
            setFormTitle("Customer Create");
            break;
          case "facilities":
            setFormComponent(<FacilityCreate />);
            setFormTitle("Facility Create");
            break;
          case "locations":
            setFormComponent(<LocationCreate />);
            setFormTitle("Location create");
            break;
          case "equipment":
            setFormComponent(<EquipmentCreate />);
            setFormTitle("Equipment create");
            break;
        }
        break;
      case "edit":
        switch (type.entity) {
          case "customers":
            //setFormComponent(<CustomerEdit />);
            break;
          case "facilities":
            //setFormComponent(<FacilityEdit />);
            break;
        }
    }
  }, [type, mode]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>{formTitle}</ModalHeader>
      <ModalBody>{FormComponent}</ModalBody>
      <ModalFooter>
        <Button
          className="me-3"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          Cancel
        </Button>
        <Button color="primary" form="form">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
