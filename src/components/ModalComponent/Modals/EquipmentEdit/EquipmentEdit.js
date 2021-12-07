import React, { useContext, useState, useEffect } from "react";
import "../../../../scss/customer-create-page.scss";
import star from "../../../../assets/img/star.svg";
import { Form, FormGroup, Label, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import equipmentApi from "../../../../js/api/equipment";
import { GlobalContext } from "../../../../context";
import convertToBase64 from "../../../../js/helpers/convertImage";

const EquipmentEdit = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();
  const { setShowFormModal, entityID, editId } = useContext(GlobalContext);
  const [equipment, setEquipment] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: equipment });
  useEffect(() => {
    equipmentApi.getEquipment(editId).then((data) => {
      setEquipment(data);
      reset(data.equipment);
      setLoadedImg(process.env.REACT_APP_SERVER_URL + "/" + data.img);
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

    if (data.locationID) body["location_id"] = data.locationID;
    if (data.name) body["name"] = data.name;

    equipment.editEquipment(equipment.id, body).then((res) => {
      if (res.status === "Successfully updated")
        alert("success", "Equipment updated.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  return (
    <div className="create-form">
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="locationID-field">Location ID</Label>
          <Col sm={12}>
            <input
              className="form-control"
              id="locationID-field"
              value={entityID}
              {...register("locationID")}
              readOnly
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="name-field">Name</Label>
          <Col sm={12}>
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

export default EquipmentEdit;
