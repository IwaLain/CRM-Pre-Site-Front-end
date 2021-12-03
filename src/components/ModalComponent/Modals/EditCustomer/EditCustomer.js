import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import { Form, FormGroup, Label, Col } from "reactstrap";
import star from "../../../../assets/img/star.svg";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import customersApi from "../../../../js/api/customer";
import convertToBase64 from "../../../../js/helpers/convertImage";
import { GlobalContext } from "../../../../context";
const EditCustomer = () => {
  const { editId, setShowFormModal } = useContext(GlobalContext);
  const [customer, setCustomer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: customer });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    customersApi.getCustomer(editId).then(({ customer }) => {
      setCustomer(customer[editId]);
      reset(customer[editId]);
      setLoadedImg(
        process.env.REACT_APP_SERVER_URL + "/" + customer[editId].img
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

    if (data.name) body["name"] = data.name;
    if (data.email) body["email"] = data.email;
    if (data.phone) body["phone"] = data.phone;
    if (data.address) body["address"] = data.address;
    if (data.activity) body["activity"] = data.activity;
    if (data.headname) body["head_name"] = data.headname;

    customersApi.updateCustomer(customer.id, body).then((res) => {
      console.log(res);
      if (res.status === "Successfully updated")
        alert("success", "Customer updated.");
      else alert("error", "Request error.");
    });
    setShowFormModal(false);
  };

  return (
    <div className="create-form">
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
          <Col sm={10}>
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
          <Col sm={10}>
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
          <Col sm={10}>
            <input
              className={`form-control ${errors.headname ? "is-invalid" : ""}`}
              id="headname-field"
              placeholder="Enter customer head name."
              {...register("head_name", {
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
export default EditCustomer;
