import React, { useContext, useState } from "react";
import "../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/methods/alert";
import { addLocation } from "../../../js/api/locations";
import { PageContext } from "../../../context";

const LocationCreate = () => {
  const { setShowFormModal, entityID } = useContext(PageContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const body = {};

    if (data.facilityID) body["facility_id"] = data.facilityID;
    if (data.name) body["name"] = data.name;

    addLocation(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Location created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  return (
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
              placeholder="Enter equipment name."
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
      </Form>
    </div>
  );
};

export default LocationCreate;
