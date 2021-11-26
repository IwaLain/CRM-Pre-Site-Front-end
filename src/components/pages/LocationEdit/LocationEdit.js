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
import { alert } from "../../../js/methods/alert";
import { getLocationAPI, updateLocationsAPI } from "../../../js/api/locations";
import { location as locationApi } from "../../../js/api/locations";
import { GlobalContext } from "../../../context";

const LocationEdit = () => {
  const { setShowFormModal, editId, entityID } = useContext(GlobalContext);
  const [fields, setFields] = useState([]);
  const [fieldCount, setFieldCount] = useState(1);
  const [addFieldModal, setAddFieldModal] = useState(false);
  const [location, setlocation] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    locationApi.getLocation(editId).then((data) => {
      setlocation(data.location);
      const jsonData = data.location["jsonData"];
      const newFields = fields;
      jsonData.forEach((el) => {
        Object.entries(el).map(([key, value]) => {
          newFields.push({
            id: `field${fieldCount}`,
            title: key,
            value: value,
          });
        });
      });

      setFields(newFields);
    });
  }, []);
  const onSubmit = (data) => {
    console.log(data);
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

      locationApi.updateLocationsAPI(editId, body).then((res) => {
        if (res.status === "Successfully updated")
          alert("success", "Location updated.");
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
            <FormGroup row>
              <Label sm={3} for="add-field-field">
                Address title
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
                <Col sm={10}>
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
                    defaultValue={value}
                  />
                </Col>
              </FormGroup>
            ))}
          <FormGroup row>
            <Col sm={2} className="offset-md-2">
              <Button color="primary" onClick={toggleAddFieldModal}>
                Add address
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default LocationEdit;
