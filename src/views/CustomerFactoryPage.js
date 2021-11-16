import React, { useState, useEffect } from "react";

import { Col, Form, FormGroup, Label, Button } from "reactstrap";
import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";
import "react-toastify/dist/ReactToastify.css";
import "../scss/components/create-customer.scss";
import "../scss/components/factory-page.scss";
import { useForm } from "react-hook-form";
import { alert } from "../js/methods/alert";
const CustomerFactoryPage = () => {
  const inputsArray = [
    { id: "1", title: "Label title", value: "title" },
    { id: "2", title: "Label title", value: "address" },
    { id: "3", title: "Label title", value: "address" },
    { id: "4", title: "Label title", value: "address" },
  ];
  const initialImages = [
    { id: "1", src: logo },
    { id: "2", src: logo },
  ];
  const [factoryImage, setFactoryImage] = useState(logo);

  const [inputFields, setInputFields] = useState(inputsArray);
  const [attachedImages, setAttachedImages] = useState(initialImages);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();
  // const handleSubmit = () => {
  //   return 1;
  // };
  const onSubmit = () => {
    alert("success", "Success save");
    reset();
  };
  const addFieldHandler = () => {
    setInputFields((oldArray) => {
      const newElement = {
        id: oldArray.length + 1,
        title: "Label title",
      };
      return [...oldArray, newElement];
    });
  };
  const removeImageHandler = (e) => {
    const imgContainer = e.target.parentNode;
    const img = imgContainer.querySelector("img");

    const id = img.id;
    console.log(id);
    setAttachedImages(attachedImages.filter((item) => item.id !== id));
  };
  const editImage = (e) => {
    const src = e.target.value;
    setFactoryImage(src);
  };
  const addImageHandler = (e) => {
    const newElement = {
      id: `${attachedImages.length + 1}`,
      src: e.target.value,
    };
    e.target.value = "";
    setAttachedImages((attachedImages) => [...attachedImages, newElement]);
  };

  return (
    <>
      <div className="customer-page--container"></div>
      <div className="d-flex align-items-center customer-page--header">
        <div className="img-container">
          <img
            src={factoryImage}
            alt="company img "
            className="customer-page--img"
          ></img>{" "}
          <div className="image-upload">
            <label htmlFor="factoryImg">
              {" "}
              <span className="remove-img"></span>
            </label>
            <input
              id="factoryImg"
              type="file"
              name="myfile"
              accept="image/*"
              onInput={editImage}
            />
          </div>
        </div>
        <h1 className="page-title">Customer Page Title</h1>
      </div>
      <div className="customer-page--information">
        <h2 className="page-subtitle">Information Customer</h2>

        <div className="row row-cols-1 row-cols-md-auto g-4">
          <Col className="customer-card--col">
            <div className="information--item">address</div>
          </Col>{" "}
          <Col className="customer-card--col">
            <div className="information--item">
              contact user/success manager
            </div>
          </Col>{" "}
          <Col className="customer-card--col">
            <div className="information--item">contact phone</div>
          </Col>
        </div>
      </div>{" "}
      <div className="customer-page--information">
        <h2 className="page-subtitle">Information Customer</h2>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="form--create-customer"
        >
          {inputFields &&
            inputFields.map((field, i) => (
              <FormGroup row>
                {" "}
                <Label for={"field" + field.id} sm={2}>
                  {field.title}
                </Label>{" "}
                <Col sm={8}>
                  <input
                    id={"field" + field.id}
                    name={"field" + field.id}
                    key={i}
                    defaultValue={field.value}
                    onChange={(e) => {
                      inputFields[i].value = e.target.value;
                      setInputFields([...inputFields]);
                    }}
                    {...register(`field${field.id}`, {
                      required: `${field.title} is Required`,
                    })}
                    onKeyUp={() => {
                      trigger(`field${field.id}`);
                    }}
                    className="form-control"
                  />{" "}
                  {errors[`field${field.id}`] && (
                    <small className="text-danger">
                      {errors[`field${field.id}`].message}
                    </small>
                  )}
                </Col>
              </FormGroup>
            ))}
          <FormGroup row>
            <Col sm={2}>
              <Button color="primary" onClick={addFieldHandler}>
                Add field
              </Button>
            </Col>
          </FormGroup>{" "}
          <FormGroup row>
            {" "}
            <Col sm={10}>
              <div className="btn-toolbar ">
                <Button color="primary" className="me-3">
                  Submit
                </Button>
                <Button type="reset">Cancel</Button>
              </div>
            </Col>
          </FormGroup>
        </Form>{" "}
      </div>
      <div className="customer-page--factories">
        {" "}
        <h2 className="page-subtitle">Attached images</h2>
        <div className="d-flex">
          {attachedImages &&
            attachedImages.map((img) => (
              <div className="img-container">
                <img
                  src={img.src}
                  alt="..."
                  className="factory-img"
                  id={img.id}
                ></img>{" "}
                <span
                  className="remove-img"
                  onClick={removeImageHandler}
                ></span>
              </div>
            ))}

          <div className="upload-btn-wrapper factory--upload-btn-wrapper">
            {" "}
            <Button color="primary" className="factory--upload-btn">
              Add image
            </Button>
            <input
              id="customerImg"
              type="file"
              name="myfile"
              accept="image/*"
              onChange={addImageHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerFactoryPage;
