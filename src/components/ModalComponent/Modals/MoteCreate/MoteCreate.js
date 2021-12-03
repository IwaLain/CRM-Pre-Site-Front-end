import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import { GlobalContext } from "../../../../context";
import placeholder from "../../../../assets/img/company.png";

const MoteCreate = () => {
  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [gatewaysNames, setGatewaysNames] = useState([]);
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [facilityID, setFacilityID] = useState();
  const [gatewayID, setGatewayID] = useState();
  const [equipmentID, setEquipmentID] = useState();
  const { setShowFormModal, selectedCustomer, customerStructure } =
    useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelect = (e, type) => {
    switch (type) {
      case "facility":
        setFacilityID(e.target.value);
        break;
      case "gateway":
        setGatewayID(e.target.value);
        break;
      case "equipment":
        setEquipmentID(e.target.value);
      default:
        break;
    }
  };

  const formatNames = (data) => {
    const formattedNames = [];

    for (const [key, value] of Object.entries(data)) {
      formattedNames.push({ id: key, name: value.name });
    }

    return formattedNames;
  };

  const onSubmit = (data) => {
    const body = {};

    if (selectedCustomer.id) body["customer_id"] = selectedCustomer.id;
    if (facilityID) body["facility_id"] = facilityID;
    if (gatewayID) body["gateway_id"] = gatewayID;
    if (equipmentID) body["equipment_id"] = equipmentID;
    if (data.info) body["location_info"] = data.info;
    body["name"] = "name";

    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/mote/create?access-token=" +
        localStorage.getItem("token"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "Successfully created")
          alert("success", "Mote created.");
        else alert("error", "Request error.");
      });

    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  useEffect(() => {
    setFacilitiesNames(formatNames(customerStructure["facilities"]));
    setFacilityID(Object.keys(customerStructure["facilities"])[0]);

    setGatewaysNames(formatNames(customerStructure["gateways"]));
    setGatewayID(Object.keys(customerStructure["gateways"])[0]);

    setEquipmentNames(formatNames(customerStructure["equipment"]));
    setEquipmentID(Object.keys(customerStructure["equipment"])[0]);
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
        <FormGroup>
          <Label for="facilityID-field">Facility</Label>
          <Col sm={12}>
            <Input
              id="select-facility"
              onChange={(e) => handleSelect(e, "facility")}
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
        <FormGroup>
          <Label for="gatewayID-field">Gateway</Label>
          <Col sm={12}>
            <Input
              id="select-facility"
              onChange={(e) => handleSelect(e, "gateway")}
              type="select"
            >
              {gatewaysNames &&
                gatewaysNames.map((gateway) => (
                  <option key={gateway.id} value={gateway.id}>
                    {gateway.id}. {gateway.name}
                  </option>
                ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="gatewayID-field">Equipment</Label>
          <Col sm={12}>
            <Input
              id="select-facility"
              onChange={(e) => handleSelect(e, "equipment")}
              type="select"
            >
              {equipmentNames &&
                equipmentNames.map((equip) => (
                  <option key={equip.id} value={equip.id}>
                    {equip.id}. {equip.name}
                  </option>
                ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="serial-field">Serial</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.serial ? "is-invalid" : ""}`}
              id="serial-field"
              placeholder="Enter serial number."
              {...register("serial", {
                required: {
                  value: true,
                  message: "Serial is required.",
                },
                pattern: {
                  value: /^[0-9]/,
                  message: "Please enter number.",
                },
              })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="info-field">Location info</Label>
          <Col sm={12}>
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

export default MoteCreate;
