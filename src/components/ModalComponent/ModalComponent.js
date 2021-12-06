import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomerCreate from "./Modals/CustomerCreate/CustomerCreate";
import FacilityCreate from "./Modals/FacilityCreate/FacilityCreate";
import LocationCreate from "./Modals/LocationCreate/LocationCreate";
import EquipmentCreate from "./Modals/EquipmentCreate/EquipmentCreate";
import EditCustomer from "./Modals/EditCustomer/EditCustomer";
import FacilityEdit from "./Modals/FacilityEdit/FacilityEdit";
import EquipmentEdit from "./Modals/EquipmentEdit/EquipmentEdit";
import LocationEdit from "./Modals/LocationEdit/LocationEdit";
import GatewayCreate from "./Modals/GatewayCreate/GatewayCreate";
import NodeCreate from "./Modals/NodeCreate/NodeCreate";
import MoteCreate from "./Modals/MoteCreate/MoteCreate";
import RouterCreate from "./Modals/RouterCreate/RouterCreate";
import SensorCreate from "./Modals/SensorCreate/SensorCreate";

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
          case "gateways":
            setFormComponent(<GatewayCreate />);
            setFormTitle("Gateway create");
            break;
          case "nodes":
            setFormComponent(<NodeCreate />);
            setFormTitle("Node create");
            break;
          case "motes":
            setFormComponent(<MoteCreate />);
            setFormTitle("Mote create");
            break;
          case "routers":
            setFormComponent(<RouterCreate />);
            setFormTitle("Router create");
            break;
          case "sensors":
            setFormComponent(<SensorCreate />);
            setFormTitle("Sensor create");
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
