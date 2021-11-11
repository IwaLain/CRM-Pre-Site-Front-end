import React from "react";
import { Form, FormGroup, Label, Button, Col } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "../scss/components/create-customer.scss";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { alert } from "../js/methods/alert";

const CreateCustomer = () => {
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
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="form--create-customer">
        <h1 className="page-title">Create Customer</h1>
        <FormGroup row>
          <Label for="customerTitle" sm={2}>
            Customer Title
          </Label>
          <Col sm={10}>
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
          <Col sm={10}>
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
          <Col sm={10}>
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
        </FormGroup>
        <FormGroup row>
          <Label for="labelTitle2" sm={2}>
            Label Title
          </Label>
          <Col sm={10}>
            <input
              id="labelTitle2"
              name="labelTitle2"
              type="text"
              {...register("labelTitle2", {
                required: "label title is Required",
              })}
              onKeyUp={() => {
                trigger("labelTitle2");
              }}
              className="form-control"
            />{" "}
            {errors.labelTitle2 && (
              <small className="text-danger">
                {errors.labelTitle2.message}
              </small>
            )}
          </Col>
        </FormGroup>{" "}
        <FormGroup row>
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
        </FormGroup>{" "}
        <FormGroup row>
          {" "}
          <Col sm={2}></Col>
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
      <ToastContainer position="bottom-right" />
    </>
  );
};
export default CreateCustomer;
