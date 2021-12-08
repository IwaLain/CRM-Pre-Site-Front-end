import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
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
import { alert } from "../../../../js/helpers/alert";
import location from "../../../../js/api/locations";
import { GlobalContext } from "../../../../context";
import AttachmentList from "../../../AttachmentList/AttachmentList";
const LocationCreate = () => {
  const { setShowFormModal, entityID } = useContext(GlobalContext);
  const [fields, setFields] = useState([]);
  const [fieldCount, setFieldCount] = useState(1);
  const [addFieldModal, setAddFieldModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(data).length > 2) {
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
      if (createdFiles.length > 0) {
        body["img"] = createdFiles;
      }
      location.addLocation(body).then((res) => {
        if (res.status === "Successfully created")
          alert("success", "Location created.");
        else alert("error", "Request error.");
      });

      document.querySelector("#form").reset();
      setShowFormModal(false);
    } else {
      alert("error", "Location should contain at least 1 address.");
    }
  };

  const toggleAddFieldModal = () => {
    setAddFieldModal(!addFieldModal);
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
        <ModalHeader>Add address</ModalHeader>
        <ModalBody>
          <Form id="add-field-form" onSubmit={handleAddFieldFormSubmit}>
            <FormGroup>
              <Label for="add-field-field">Address title</Label>
              <Col sm={12}>
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
      <div className="create-form">
        <Form id="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="facilityID-field">Facility ID</Label>
            <Col sm={12}>
              <input
                className="form-control"
                id="facilityID-field"
                value={entityID}
                {...register("facilityID")}
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="name-field">Name</Label>
            <Col sm={12}>
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
            fields.map(({ id, title }) => (
              <FormGroup key={id}>
                <Label for={`${id}-field`}>{title}</Label>
                <Col sm={12}>
                  <input
                    className={`form-control ${
                      errors[`${id}`] ? "is-invalid" : ""
                    }`}
                    id={`${id}-field`}
                    placeholder="Enter address."
                    {...register(`${id}`, {
                      required: {
                        value: true,
                        message: "Address is required.",
                      },
                      minLength: {
                        value: 3,
                        message: "Address should contain at least 3 symbols.",
                      },
                    })}
                  />
                </Col>
              </FormGroup>
            ))}
          <FormGroup>
            <Col>
              <Button color="primary" onClick={toggleAddFieldModal}>
                Add address
              </Button>
            </Col>
          </FormGroup>
          {
            <AttachmentList
              attachedFiles={[]}
              // onAddFileServer={addLocationImageServer}
              // onRemoveFileServer={deleteLocationImageServer}
              setCreatedFiles={setCreatedFiles}
            />
          }
        </Form>
      </div>
    </>
  );
};

export default LocationCreate;
