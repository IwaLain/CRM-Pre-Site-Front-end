import React, { useState } from "react";
import "./customer-create-page.scss";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";
import star from "../../../assets/img/star.svg";
import { useForm } from "react-hook-form";
import { alert } from "../../../js/methods/alert";
import { addCustomerAPI } from "../../../js/api/customer";

const CustomerCreatePage = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLoadedImg(url);
      setImgLoaded(true);
    }
  };

  const onSubmit = () => {
    addCustomerAPI().then((res) => {
      console.log(res);
    });
    alert("success", "Customer created.");
    document.querySelector("#form").reset();
  };

  return (
    <div className="customer-create">
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Customer Create</h2>
        <FormGroup row>
          <Label sm={2} for="name-field">
            Name
          </Label>
          <Col sm={10}>
            <Input
              className={`${errors.name ? "invalid" : ""}`}
              id="name-field"
              placeholder="Enter customer name."
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 3,
                  message: "Minimum 3 symbols",
                },
              })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="addUser__desc text-danger">
                {errors.name.message}
              </small>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="email-field">
            Email
          </Label>
          <Col sm={10}>
            <Input id="email-field" placeholder="Enter customer email." />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="phone-field">
            Phone
          </Label>
          <Col sm={10}>
            <Input id="phone-field" placeholder="Enter customer phone." />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="address-field">
            Address
          </Label>
          <Col sm={10}>
            <Input id="address-field" placeholder="Enter customer address." />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="activity-field">
            Activity
          </Label>
          <Col sm={10}>
            <Input id="activity-field" placeholder="Enter customer activity." />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} for="headname-field">
            Head name
          </Label>
          <Col sm={10}>
            <Input
              id="headname-field"
              placeholder="Enter customer head name."
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
            <Input
              id="image-field"
              type="file"
              accept="image/*"
              onChange={addImageHandler}
            />
          </Col>
        </FormGroup>
        <Button color="primary" className="me-3" type="submit">
          Submit
        </Button>
        <Button type="reset" onClick={() => reset()}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};
export default CustomerCreatePage;
