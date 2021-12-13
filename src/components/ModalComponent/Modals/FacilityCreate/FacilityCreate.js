import React, { useState, useContext, useEffect } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import { GlobalContext } from "../../../../context";
import facilitiesApi from "../../../../js/api/facilities";
import placeholder from "../../../../assets/img/company.png";
import AttachmentList from "../../../AttachmentList/AttachmentList";

const FacilityCreate = () => {
  const [customerName, setCustomerName] = useState();
  const [files, setFiles] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);

  const { entityID, setShowFormModal } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const body = {};

    body["customer_id"] = entityID;
    if (data.name) body["name"] = data.name;
    if (data.lat) body["lat"] = data.lat;
    if (data.lng) body["lng"] = data.lng;
    if (data.address) body["address"] = data.address;
    if (createdFiles.length > 0) {
      body["img"] = createdFiles;
    }

    facilitiesApi.addFacilities(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Facility created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  useEffect(() => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer/" +
        entityID +
        "?access-token=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomerName(data.customer[entityID].name);
      });
  }, [entityID]);

  return (
    <div className="create-form">
      <img
        id="placeholder-img"
        src={placeholder}
        alt="placeholder err"
        style={{ display: "none" }}
      />
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="customerID-field">Customer</Label>
          <Col sm={12}>
            <input
              className="form-control"
              id="customerID-field"
              value={customerName}
              {...register("customerID")}
              readOnly
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="title-field">Title</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="title-field"
              placeholder="Enter factory title."
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
        <FormGroup>
          <Label for="lat-field">Lat</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.lat ? "is-invalid" : ""}`}
              id="lat-field"
              placeholder="Enter lat cord."
              {...register("lat", {
                required: {
                  value: true,
                  message: "lat is required.",
                },
                pattern: {
                  value: /^-?[0-9]\d*\.?\d*$/,
                  message: "Lat is number only.",
                },
              })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="lng-field">Lng</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.lng ? "is-invalid" : ""}`}
              id="lng-field"
              placeholder="Enter lng cord."
              {...register("lng", {
                required: {
                  value: true,
                  message: "Lng is required.",
                },
                pattern: {
                  value: /^-?[0-9]\d*\.?\d*$/,
                  message: "Lng is number only.",
                },
              })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="address-field">Address</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address-field"
              placeholder="Enter factory address."
              {...register("address", {
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
        {files && (
          <AttachmentList
            attachedFiles={files}
            setCreatedFiles={setCreatedFiles}
          />
        )}
      </Form>
    </div>
  );
};

export default FacilityCreate;
