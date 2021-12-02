import React, { useContext, useEffect, useState } from "react";
import "../../../scss/customer-create-page.scss";
import star from "../../../assets/img/star.svg";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/helpers/alert";
import { GlobalContext } from "../../../context";
import convertToBase64 from "../../../js/helpers/convertImage";
import placeholder from "../../../assets/img/company.png";

const GatewayCreate = () => {
  const [locationImgIsLoaded, setLocationImgIsLoaded] = useState(false);
  const [equipmentImgIsLoaded, setEquipmentImgIsLoaded] = useState(false);
  const [loadedLocationImg, setLoadedLocationImg] = useState();
  const [loadedEquipmentImg, setLoadedEquipmentImg] = useState();
  const [locationImg, setLocationImg] = useState();
  const [equipmentImg, setEquipmentImg] = useState();
  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [facilityID, setFacilityID] = useState();
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
    const formData = new FormData();
    if (selectedCustomer.id)
      formData.append("customer_id", selectedCustomer.id);
    if (facilityID) formData.append("facility_id", facilityID);
    if (data.name) formData.append("name", data.name);
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
        type_id: 1,
        img: getBase64Image(document.querySelector("#placeholder-img")),
      });
    if (Object.keys(img).length > 0)
      formData.append("img", JSON.stringify(img));
    if (data.info) formData.append("location-info", data.info);

    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/gateway/create?access-token=" +
        localStorage.getItem("token"),
      {
        method: "POST",
        body: formData,
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
              placeholder="Enter gateway name."
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
        <FormGroup row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={2}>Location Image</Col>
          <Col sm={10}>
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
        <FormGroup row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={2}>Equipment Image</Col>
          <Col sm={10}>
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
        <FormGroup row>
          <Label sm={2} for="info-field">
            Location info
          </Label>
          <Col sm={10}>
            <textarea
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="info-field"
              placeholder="Enter location info."
              {...register("info")}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default GatewayCreate;
