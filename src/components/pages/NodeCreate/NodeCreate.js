import React, { useContext, useEffect, useState } from "react";
import "../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/helpers/alert";
import { GlobalContext } from "../../../context";
import placeholder from "../../../assets/img/company.png";

const NodeCreate = () => {
  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [facilityID, setFacilityID] = useState();
  const [gatewayID, setGatewayID] = useState();
  const { setShowFormModal, selectedCustomer } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFacilitySelect = (e) => {
    setFacilityID(e.target.value);
  };

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: value.id, name: value.name });
    }

    return formattedNames;
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (selectedCustomer.id)
      formData.append("customer_id", selectedCustomer.id);
    if (facilityID) formData.append("facility_id", facilityID);
    if (gatewayID) formData.append("gateway_id", gatewayID);
    if (data.name) formData.append("name", data.name);

    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/node/create?access-token=" +
        localStorage.getItem("token"),
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "Successfully created")
          alert("success", "Node created.");
        else alert("error", "Request error.");
      });

    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  useEffect(() => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/customer/" +
        selectedCustomer.id +
        "/facilities?access-token=" +
        localStorage.getItem("token") +
        "&limit=-1"
    )
      .then((res) => res.json())
      .then((data) => {
        setFacilitiesNames(formatNames(data["facilities"]));
        setFacilityID(Object.keys(data["facilities"])[0]);
      });
  }, []);

  return (
    <div className="create-form">
      <img
        id="placeholder-img"
        src={placeholder}
        alt="placeholder err"
        style={{ display: "none" }}
      />
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup row>
          <Label sm={2} for="facilityID-field">
            Facility
          </Label>
          <Col sm={10}>
            <Input
              id="select-facility"
              onChange={handleFacilitySelect}
              type="select"
            >
              {facilitiesNames &&
                facilitiesNames.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.id}. {facility.name}
                  </option>
                ))}
            </Input>
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
              placeholder="Enter node name."
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
        <FormGroup row>
          <Label sm={2} for="info-field">
            Location info
          </Label>
          <Col sm={10}>
            <textarea
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="info-field"
              placeholder="Enter info."
              {...register("info")}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NodeCreate;
