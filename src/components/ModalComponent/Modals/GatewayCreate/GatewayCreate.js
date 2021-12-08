import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import { GlobalContext } from "../../../../context";
import placeholder from "../../../../assets/img/company.png";
import AttachmentList from "../../../AttachmentList/AttachmentList";

const GatewayCreate = () => {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [locationImg, setLocationImg] = useState();
  const [equipmentImg, setEquipmentImg] = useState();
  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [facilityID, setFacilityID] = useState();

  const { setShowFormModal, selectedCustomer, customerStructure } =
    useContext(GlobalContext);

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
      formattedNames.push({ id: key, name: value.name });
    }

    return formattedNames;
  };

  const onSubmit = (data) => {
    const body = {};

    if (selectedCustomer.id) body["customer_id"] = selectedCustomer.id;
    if (facilityID) body["facility_id"] = facilityID;
    body["name"] = "name";
    if (data.serial) body["serial"] = data.serial;
    if (data.info) body["location-info"] = data.info;
    const img = [];
    if (locationImg) img.push({ type_id: 1, img: locationImg });
    if (equipmentImg) img.push({ type_id: 2, img: equipmentImg });

    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/gateway/create?access-token=" +
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
          alert("success", "Gateway created.");
        else alert("error", "Request error.");
      });

    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  useEffect(() => {
    setFacilitiesNames(formatNames(customerStructure["facilities"]));
    setFacilityID(Object.keys(customerStructure["facilities"])[0]);
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
              placeholder="Enter location info."
              {...register("info")}
            />
          </Col>
        </FormGroup>
        {files && (
          <AttachmentList
            attachedFiles={files}
            setCreatedFiles={setEquipmentImg}
          />
        )}
        {files2 && (
          <AttachmentList
            attachedFiles={files2}
            setCreatedFiles={setLocationImg}
          />
        )}
      </Form>
    </div>
  );
};

export default GatewayCreate;
