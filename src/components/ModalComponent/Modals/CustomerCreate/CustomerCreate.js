import React, { useContext, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col } from "reactstrap";
import star from "../../../../assets/img/star.svg";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import customersApi from "../../../../js/api/customer";
import convertToBase64 from "../../../../js/helpers/convertImage";
import { GlobalContext } from "../../../../context";
import placeholder from "../../../../assets/img/company.png";
import AttachmentList from "../../../AttachmentList/AttachmentList";

const CustomerCreate = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();
  const [files, setFiles] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);

  const { setShowFormModal } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getBase64Image = (img) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");

    return dataURL;
  };

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

    if (data.name) body["name"] = data.name;
    if (data.email) body["email"] = data.email;
    if (data.phone) body["phone"] = data.phone;
    if (data.address) body["address"] = data.address;
    if (data.activity) body["activity"] = data.activity;
    if (data.headname) body["head_name"] = data.headname;
    if (createdFiles.length > 0) {
      body["img"] = createdFiles;
    }

    customersApi.addCustomer(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Customer created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

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
          <Label for="name-field">Name</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name-field"
              placeholder="Enter customer name."
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
          <Label for="email-field">Email</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email-field"
              placeholder="Enter customer email."
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required.",
                },
                pattern: {
                  value: /^[\w-.]+@([\w-]+.)+[\w-]{1,10}$/,
                  message: "Email is not valid. Example: alex@gmail.com",
                },
              })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="phone-field">Phone</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone-field"
              placeholder="Enter customer phone."
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone is required.",
                },
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                  message: "Phone is not valid. Example: +123456789098",
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
              placeholder="Enter customer address."
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
        <FormGroup>
          <Label for="activity-field">Activity</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.activity ? "is-invalid" : ""}`}
              id="activity-field"
              placeholder="Enter customer activity."
              {...register("activity", {
                required: {
                  value: true,
                  message: "Activity is required.",
                },
                minLength: {
                  value: 3,
                  message: "Activity should contain at least 3 symbols.",
                },
              })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="headname-field">Head name</Label>
          <Col sm={12}>
            <input
              className={`form-control ${errors.headname ? "is-invalid" : ""}`}
              id="headname-field"
              placeholder="Enter customer head name."
              {...register("headname", {
                required: {
                  value: true,
                  message: "Headname is required.",
                },
                minLength: {
                  value: 3,
                  message: "Headname should contain at least 3 symbols.",
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

export default CustomerCreate;
