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
import EditCustomer from "../pages/EditCustomer/EditCustomer";
import FacilityEdit from "../pages/FacilityEdit/FacilityEdit";
import EquipmentEdit from "../pages/EquipmentEdit/EquipmentEdit";
import LocationEdit from "../pages/LocationEdit/LocationEdit";
const ModalComponent = ({ toggle, modal, type, mode }) => {
  const [FormComponent, setFormComponent] = useState();
  const [formTitle, setFormTitle] = useState();

  useEffect(() => {
    console.log("ASd");
    switch (mode) {
      case "create":
        switch (type.entity) {
          case "customers":
            setFormComponent(<CustomerCreate />);
            setFormTitle("Customer Create");
            break;
          case "facilities":
            setFormComponent(<FacilityCreate />);
            break;
          default:
            break;
        }
        break;
      case "edit":
        switch (type.entity) {
          case "customers":
            setFormComponent(<EditCustomer />);
            setFormTitle("Customer Edit");
            break;
          case "facilities":
            setFormComponent(<FacilityEdit />);
            setFormTitle("Facility Edit");
            break;
          case "equipment":
            setFormComponent(<EquipmentEdit />);
            setFormTitle("Equipment Edit");
            break;
          case "locations":
            setFormComponent(<LocationEdit />);
            setFormTitle("Location Edit");
            break;
          default:
            break;
        }
        break;
      default:
        break;
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
        <Button form="form" className="formUser__submit">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
