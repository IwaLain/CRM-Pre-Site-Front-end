import React, { useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col } from "reactstrap";
import star from "../../../../assets/img/star.svg";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import convertToBase64 from "../../../../js/helpers/convertImage";
import { GlobalContext } from "../../../../context";
import { useContext } from "react";

import facilitiesApi from "../../../../js/api/facilities";
const FacilityEdit = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();

  const { editId, entityID, setShowFormModal } = useContext(GlobalContext);
  const [facility, setFacility] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: facility });
  useEffect(() => {
    facilitiesApi.getFacility(editId).then(({ facility }) => {
      setFacility(facility[editId]);
      reset(facility[editId]);
      setLoadedImg(
        process.env.REACT_APP_SERVER_URL + "/" + facility[editId].img
      );
      setImgLoaded(true);
    });
  }, [reset]);
  const addImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file).then((res) => setImg(res));
      const url = URL.createObjectURL(file);
      setLoadedImg(url);
      setImgLoaded(true);
    }
  };

  const onSubmit = (data) => {
    const body = {};

    if (data.customerID) body["customer_id"] = data.customerID;
    if (data.name) body["name"] = data.name;
    if (data.lat) body["lat"] = data.lat;
    if (data.lng) body["lng"] = data.lng;
    if (data.address) body["address"] = data.address;

    facilitiesApi.editFacilities(facility.id, body).then((res) => {
      if (res.status === "Successfully updated")
        alert("success", "Facility updated.");
      else alert("error", "Request error.");
    });
    setShowFormModal(false);
  };

  return (
    <div className="create-form">
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="customerID-field">Customer ID</Label>
          <Col sm={12}>
            <input
              className="form-control"
              id="customerID-field"
              value={entityID}
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
        {/* <FormGroup style={{ display: "flex", alignItems: "center" }}>
          <Col>Image</Col>
          <Col sm={12}>
            {!imgLoaded ? (
              <Label className="image-field" for="image-field">
                <img className="star" src={star} alt="star" />
                <span>Add image</span>
              </Label>
            ) : (
              <Label className="image-field" for="image-field">
                <img src={loadedImg} alt="customer-img" />
              </Label>
            )}
            <input
              className="form-control"
              id="image-field"
              type="file"
              accept="image/*"
              onChange={addImageHandler}
            />
          </Col>
        </FormGroup> */}
      </Form>
    </div>
  );
};

export default FacilityEdit;
