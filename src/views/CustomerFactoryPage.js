import React, { useState } from "react";

import { Col, Form, FormGroup, Label, Button } from "reactstrap";
import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";
import "react-toastify/dist/ReactToastify.css";
import "../scss/components/create-customer.scss";
import "../scss/components/factory-page.scss";

import InformationComponent from "../components/InformationComponent";
import FormComponent from "../components/FormComponent";
const CustomerFactoryPage = () => {
  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];

  const items = [
    { name: "address" },
    { name: "contact user/success manager" },
    { name: "contact phone" },
  ];
  const initialImages = [
    { id: "1", src: logo },
    { id: "2", src: logo },
  ];
  const [factoryImage, setFactoryImage] = useState(logo);

  const editImage = (e) => {
    const src = e.target.value;
    setFactoryImage(src);
  };

  return (
    <>
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
      <InformationComponent items={items}></InformationComponent>
      <FormComponent
        formFields={formFields}
        formName="Create Customer"
        addFieldBtn={true}
        attachedImages={true}
        images={initialImages}
      ></FormComponent>
    </>
  );
};

export default CustomerFactoryPage;
