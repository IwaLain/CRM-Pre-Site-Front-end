import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import { GlobalContext } from "../../../../context";
import placeholder from "../../../../assets/img/company.png";

const SensorCreate = () => {
  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [nodesNames, setNodesNames] = useState([]);
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [facilityID, setFacilityID] = useState();
  const [nodeID, setNodeID] = useState();
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
      case "node":
        setNodeID(e.target.value);
        break;
      case "equipment":
        setEquipmentID(e.target.value);
        break;
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
    if (nodeID) body["node_id"] = nodeID;
    if (equipmentID) body["equipment_id"] = equipmentID;
    if (data.info) body["location_info"] = data.info;
    body["name"] = "name";

    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/sensor/create?access-token=" +
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
          alert("success", "Sensor created.");
        else alert("error", "Request error.");
      });

    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  useEffect(() => {
    setFacilitiesNames(formatNames(customerStructure["facilities"]));
    setFacilityID(Object.keys(customerStructure["facilities"])[0]);

    setNodesNames(formatNames(customerStructure["nodes"]));
    setNodeID(Object.keys(customerStructure["nodes"])[0]);

    setEquipmentNames(formatNames(customerStructure["equipment"]));
    setEquipmentID(Object.keys(customerStructure["equipment"])[0]);
  }, [customerStructure]);

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
          <Label for="equipmentID-field">Equipment</Label>
          <Col sm={12}>
            <Input
              id="select-equipment"
              onChange={(e) => handleSelect(e, "equipment")}
              type="select"
            >
              {equipmentNames &&
                equipmentNames.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.id}. {equipment.name}
                  </option>
                ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="nodeID-field">Node</Label>
          <Col sm={12}>
            <Input
              id="select-node"
              onChange={(e) => handleSelect(e, "node")}
              type="select"
            >
              {nodesNames &&
                nodesNames.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.id}. {node.name}
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
              className={`form-control ${errors.info ? "is-invalid" : ""}`}
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

export default SensorCreate;
