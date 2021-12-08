import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  FormGroup,
  Col,
  Form,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context";
import customersApi from "../../js/api/customer";
import AttachmentList from "../AttachmentList/AttachmentList";

const ModalSketch = ({ toggle, modal, type, mode = "create" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formTitle, setFormTitle] = useState();
  const [modalFields, setModalFields] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);
  let submitRequest;

  useEffect(() => {
    switch (mode) {
      case "create":
        switch (type.entity) {
          case "customers":
            setFormTitle("Customer Create");
            submitRequest = customersApi.addCustomer;
            setModalFields([
              {
                title: "Name",
                inputType: "text",
                fieldType: "form",
              },
              {
                title: "Email",
                inputType: "email",
                fieldType: "form",
              },
              {
                title: "Phone",
                inputType: "phone",
                fieldType: "form",
              },
              {
                title: "Address",
                inputType: "text",
                fieldType: "form",
              },
              {
                title: "Activity",
                inputType: "text",
                fieldType: "form",
              },
              {
                title: "Headname",
                inputType: "text",
                fieldType: "form",
              },
              {
                inputType: "images",
                fieldType: "component",
              },
            ]);
            break;
          case "facilities":
            setFormTitle("Facility Create");
            break;
          case "locations":
            setFormTitle("Location create");
            break;
          case "equipment":
            setFormTitle("Equipment create");
            break;
          case "gateways":
            setFormTitle("Gateway create");
            break;
          case "nodes":
            setFormTitle("Node create");
            break;
          case "motes":
            setFormTitle("Mote create");
            break;
          case "routers":
            setFormTitle("Router create");
            break;
          case "sensors":
            setFormTitle("Sensor create");
            break;
          default:
            break;
        }
        break;
      case "edit":
        switch (type.entity) {
          case "customers":
            setFormTitle("Customer Edit");
            break;
          case "facilities":
            setFormTitle("Facility Edit");
            break;
          case "equipment":
            setFormTitle("Equipment Edit");
            break;
          case "locations":
            setFormTitle("Location Edit");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }, [type]);

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

    submitRequest(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Successfully created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>{formTitle}</ModalHeader>
      <ModalBody>
        <Form id="form" onSubmit={handleSubmit(onSubmit)}>
          {modalFields.map((field) =>
            field.fieldType === "form" ? (
              <FormGroup>
                <Label for={`${field.title}-field`}>{field.title}</Label>
                <Col sm={12}>
                  <input
                    className={`form-control ${
                      errors[field.title] ? "is-invalid" : ""
                    }`}
                    id={`${field.title}-field`}
                    placeholder={`Enter ${field.title}.`}
                    {...register(field.title, {
                      required: {
                        value: true,
                        message: `${field.title} is required.`,
                      },
                      minLength: {
                        value: 3,
                        message: `${field.title} should contain at least 3 symbols.`,
                      },
                    })}
                  />
                </Col>
              </FormGroup>
            ) : field.inputType === "images" ? (
              <AttachmentList />
            ) : (
              <div>1</div>
            )
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          Cancel
        </Button>
        <Button color="primary" form="form">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSketch;
