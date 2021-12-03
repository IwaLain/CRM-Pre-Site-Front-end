import React, { useContext, useEffect, useState } from "react";
import "../../../scss/customer-create-page.scss";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/helpers/alert";
import locationApi from "../../../js/api/locations";
import { GlobalContext } from "../../../context";
import "../../../scss/location-edit.scss";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
const LocationEdit = () => {
  const { setShowFormModal, editId, entityID } = useContext(GlobalContext);
  const [fields, setFields] = useState([]);
  const [fieldCount, setFieldCount] = useState(1);
  const [addFieldModal, setAddFieldModal] = useState(false);
  const [removeFieldModal, setRemoveFieldModal] = useState(false);
  const [removeField, setRemoveField] = useState();
  const [location, setlocation] = useState();
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    locationApi.getLocation(editId).then((data) => {
      setlocation(data.location);
      const jsonData = data.location["jsonData"];

      reset({ name: data.location["name"] });
      if (jsonData) {
        let newFields = [];
        let newCount = 1;
        jsonData.forEach((el) => {
          newFields.push({
            id: `field${newCount}`,
            title: el.name,
            value: el.value,
          });
          newCount += 1;
        });
        setFieldCount(newCount);

        setFields(newFields);
      }
    });
  }, [reset]);
  const onSubmit = (data) => {
    console.log(data);

    const body = {};
    const jsonData = [];
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case "facilityID":
          body["facility_id"] = value;
          break;
        case "name":
          body["name"] = value;
          break;
        default:
          jsonData.push({
            name: fields.filter((el) => el.id === key)[0].title,
            value: value,
          });
          break;
      }
    }
    body["jsonData"] = jsonData;

    locationApi.editLocation(editId, body).then((res) => {
      if (res.status === "Successfully updated")
        alert("success", "Location updated.");
      else alert("error", "Request error.");
    });

    document.querySelector("#form").reset();
    setShowFormModal(false);
  };

  const toggleAddFieldModal = () => {
    setAddFieldModal(!addFieldModal);
  };
  const toggleRemoveFieldModal = () => {
    setRemoveFieldModal(!removeFieldModal);
  };
  const handleRemoveFieldFormSubmit = () => {
    unregister(removeField.id);
    setFields(fields.filter((field) => field.id !== removeField.id));
    setRemoveField("");
  };
  const handleAddFieldFormSubmit = async (e) => {
    e.preventDefault();

    const newFields = fields;
    newFields.push({
      id: `field${fieldCount}`,
      title: e.target.elements["add-field-field"].value,
    });

    setFieldCount(fieldCount + 1);
    setFields(newFields);

    toggleAddFieldModal();
  };

  return (
    <>
      <Modal isOpen={addFieldModal} toggle={toggleAddFieldModal}>
        <ModalHeader>Add Field</ModalHeader>
        <ModalBody>
          <Form id="add-field-form" onSubmit={handleAddFieldFormSubmit}>
            <FormGroup row>
              <Label sm={3} for="add-field-field">
                Field title
              </Label>
              <Col sm={9}>
                <input className="form-control" id="add-field-field" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleAddFieldModal}>Cancel</Button>
          <Button form="add-field-form" color="primary">
            Add
          </Button>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        modal={removeFieldModal}
        toggleModal={toggleRemoveFieldModal}
        title="Delete Field"
        handleSubmit={() => {
          handleRemoveFieldFormSubmit();
        }}
        modalText={`Are you sure you want to DELETE ${
          removeField && removeField.title
        }`}
      />
      {/* <Modal isOpen={removeFieldModal} toggle={toggleRemoveFieldModal}>
        <ModalHeader>Delete Field</ModalHeader>
        <ModalBody>
          <Form id="remove-field-form" onSubmit={handleRemoveFieldFormSubmit}>
            <p>
              Are you sure you want to DELETE {removeField && removeField.title}{" "}
              field?
            </p>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleRemoveFieldModal}>Cancel</Button>
          <Button form="remove-field-form" color="primary">
            Delete
          </Button>
        </ModalFooter>
      </Modal> */}
      <div className="create-form">
        <Form id="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup row>
            <Label sm={2} for="facilityID-field">
              Facility ID
            </Label>
            <Col sm={10}>
              <input
                className="form-control"
                id="facilityID-field"
                value={entityID}
                {...register("facilityID")}
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} for="name-field">
              Name
            </Label>
            <Col sm={10}>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name-field"
                placeholder="Enter location name."
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required.",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should contain at least 3 symbols.",
                  },
                })}
              />
            </Col>
          </FormGroup>
          {fields &&
            fields.map(({ id, title, value }) => (
              <FormGroup row key={id}>
                <Label sm={2} for={`${id}-field`}>
                  {title}
                </Label>
                <Col sm={10} className="delete-field">
                  <input
                    className={`form-control ${
                      errors[`${id}`] ? "is-invalid" : ""
                    }`}
                    id={`${id}-field`}
                    placeholder="Enter address."
                    {...register(`${id}`)}
                    defaultValue={value}
                  />
                  <button
                    className="btn delete-field--container"
                    onClick={(e) => {
                      e.preventDefault();
                      setRemoveField({ id, title });
                      toggleRemoveFieldModal();
                    }}
                  >
                    <span className="delete-field--cross"></span>
                  </button>
                </Col>
              </FormGroup>
            ))}
          <FormGroup row>
            <Col sm={4} className="offset-md-2">
              <Button color="primary" onClick={toggleAddFieldModal}>
                Add Field
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default LocationEdit;
