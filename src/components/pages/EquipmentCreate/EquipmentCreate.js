import React, { useContext, useState } from "react";
import "../../../scss/customer-create-page.scss";
import star from "../../../assets/img/star.svg";
import { Form, FormGroup, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/helpers/alert";
import equipmentApi from "../../../js/api/equipment";
import { GlobalContext } from "../../../context";
import convertToBase64 from "../../../js/helpers/convertImage";

const EquipmentCreate = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();
  const { setShowFormModal, entityID } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    if (data.locationID) body["location_id"] = data.locationID;
    if (data.name) body["name"] = data.name;
    if (img) body["img"] = img;
    else
      body["img"] =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTE0VDIxOjEwOjIwKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0xNFQyMToxODoxNyswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0xNFQyMToxODoxNyswMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NTJkNGI0YS03OTVk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";

    equipmentApi.addEquipment(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Equipment created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  return (
    <div className="create-form">
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup row>
          <Label sm={2} for="locationID-field">
            Location ID
          </Label>
          <Col sm={10}>
            <input
              className="form-control"
              id="locationID-field"
              value={entityID}
              {...register("locationID")}
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
        <FormGroup row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={2}>Image</Col>
          <Col sm={10}>
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
        </FormGroup>
      </Form>
    </div>
  );
};

export default EquipmentCreate;
