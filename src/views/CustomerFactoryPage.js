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
    const img = imgContainer.querySelector(".factory-img");

    const id = img.id;
    setAttachedImages(attachedImages.filter((item) => item.id !== id));
  };
  const addImageHandler = (e) => {
    setAttachedImages((oldArray) => {
      const newElement = {
        id: oldArray.length + 1,
        src: e.target.value,
      };
      return [...oldArray, newElement];
    });
  };

  return (
    <>
      <div className="customer-page--container"></div>
      <div className="d-flex align-items-center customer-page--header">
        <div className="img-container">
          <img
            src={logo}
            alt="company img "
            className="customer-page--img"
          ></img>
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
            inputFields.map((field) => (
              <FormGroup row>
                {" "}
                <Label for={"field" + field.id} sm={2}>
                  {field.title}
                </Label>{" "}
                <Col sm={8}>
                  <input
                    id={"field" + field.id}
                    name={"field" + field.id}
                    type="text"
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
          {/* <FormGroup row>
            <Label for="customerTitle" sm={2}>
              Customer Title
            </Label>
            <Col sm={8}>
              <input
                id="customerTitle"
                name="customerTitle"
                type="text"
                {...register("customerTitle", {
                  required: "customer title is Required",
                })}
                onKeyUp={() => {
                  trigger("customerTitle");
                }}
                className="form-control"
              />{" "}
              {errors.customerTitle && (
                <small className="text-danger">
                  {errors.customerTitle.message}
                </small>
              )}
            </Col>
          </FormGroup>{" "}
          <FormGroup row>
            <Label for="locationTitle" sm={2}>
              Location Title
            </Label>
            <Col sm={8}>
              {" "}
              <input
                id="locationTitle"
                name="locationTitle"
                type="text"
                {...register("locationTitle", {
                  required: "location title is Required",
                })}
                onKeyUp={() => {
                  trigger("locationTitle");
                }}
                className="form-control"
              />{" "}
              {errors.locationTitle && (
                <small className="text-danger">
                  {errors.locationTitle.message}
                </small>
              )}
            </Col>
          </FormGroup>{" "}
          <FormGroup row>
            <Label for="labelTitle1" sm={2}>
              Label Title
            </Label>
            <Col sm={8}>
              <input
                id="labelTitle1"
                name="labelTitle1"
                type="text"
                {...register("labelTitle1", {
                  required: "label title is Required",
                })}
                onKeyUp={() => {
                  trigger("labelTitle1");
                }}
                className="form-control"
              />{" "}
              {errors.labelTitle1 && (
                <small className="text-danger">
                  {errors.labelTitle1.message}
                </small>
              )}
            </Col>
          </FormGroup> */}
          <FormGroup row>
            <Col sm={2}>
              <Button color="primary" onClick={addFieldHandler}>
                Add field
              </Button>
            </Col>
          </FormGroup>{" "}
          {/* <FormGroup row>
            <Label for="customerImg" sm={2}>
              Attached Image
            </Label>
            <Col sm={10}>
              <div class="upload-btn-wrapper">
                <button class="btn btn-secondary">add image</button>
                <input
                  id="customerImg"
                  type="file"
                  name="myfile"
                  accept="image/*"
                />
              </div>
            </Col>{" "}
          </FormGroup>{" "} */}
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
              onInput={addImageHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerFactoryPage;
