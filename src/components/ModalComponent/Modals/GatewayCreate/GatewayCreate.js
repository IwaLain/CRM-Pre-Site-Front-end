import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import star from "../../../../assets/img/star.svg";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import { GlobalContext } from "../../../../context";
import convertToBase64 from "../../../../js/helpers/convertImage";
import placeholder from "../../../../assets/img/company.png";

const GatewayCreate = () => {
  const [locationImgIsLoaded, setLocationImgIsLoaded] = useState(false);
  const [equipmentImgIsLoaded, setEquipmentImgIsLoaded] = useState(false);
  const [loadedLocationImg, setLoadedLocationImg] = useState();
  const [loadedEquipmentImg, setLoadedEquipmentImg] = useState();
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

  const addImageHandler = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      switch (type) {
        case "location":
          convertToBase64(file).then((res) => setLocationImg(res));
          setLoadedLocationImg(url);
          setLocationImgIsLoaded(true);
          break;
        case "equipment":
          convertToBase64(file).then((res) => setEquipmentImg(res));
          setLoadedEquipmentImg(url);
          setEquipmentImgIsLoaded(true);
          break;
        default:
          break;
      }
    }
  };

  const getBase64Image = (img) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");

    return dataURL;
  };

  const onSubmit = (data) => {
    const body = {};

    if (selectedCustomer.id) body["customer_id"] = selectedCustomer.id;
    if (facilityID) body["facility_id"] = facilityID;
    body["name"] = "name";
    if (data.serial) body["serial"] = data.serial;
    const img = [];
    if (locationImg) img.push({ type_id: 1, img: locationImg });
    else
      img.push({
        type_id: 1,
        img: getBase64Image(document.querySelector("#placeholder-img")),
      });
    if (equipmentImg) img.push({ type_id: 2, img: equipmentImg });
    else
      img.push({
        type_id: 2,
        img: getBase64Image(document.querySelector("#placeholder-img")),
      });
    if (Object.keys(img).length > 0) body["img"] = img;
    if (data.info) body["location-info"] = data.info;
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
        <FormGroup>
          <Col>Equipment Image</Col>
          <Col sm={12}>
            {!equipmentImgIsLoaded ? (
              <Label className="image-field" for="image-equipment-field">
                <img className="star" src={star} alt="star" />
                <span>Add image</span>
              </Label>
            ) : (
              <Label className="image-field" for="image-equipment-field">
                <img src={loadedEquipmentImg} alt="customer-img" />
              </Label>
            )}
            <input
              className="form-control"
              id="image-equipment-field"
              type="file"
              accept="image/*"
              onChange={(e) => addImageHandler(e, "equipment")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col>Location Image</Col>
          <Col sm={12}>
            {!locationImgIsLoaded ? (
              <Label className="image-field" for="image-location-field">
                <img className="star" src={star} alt="star" />
                <span>Add image</span>
              </Label>
            ) : (
              <Label className="image-field" for="image-location-field">
                <img src={loadedLocationImg} alt="customer-img" />
              </Label>
            )}
            <input
              className="form-control"
              id="image-location-field"
              type="file"
              accept="image/*"
              onChange={(e) => addImageHandler(e, "location")}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default GatewayCreate;
