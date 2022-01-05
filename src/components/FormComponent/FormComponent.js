import React, { useState, useEffect } from "react";
import { Form, FormGroup, button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import FieldComponent from "./FieldComponent/FieldComponent";
import { alert } from "../../js/helpers/alert";
import "react-toastify/dist/ReactToastify.css";
import "./form-component.scss";
import AttachedImages from "../AttachedImages/AttachedImages";
import AddFieldModal from "../AddFieldModal/AddFieldModal";

const FormComponent = ({
  formName,
  addFieldBtn,
  attachedImages,
  images,
  entity,
}) => {
  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];

  const setNewField = (name, type, value) => {
    setInputFields((oldArray) => {
      let newField = {
        name: name,
        type: type,
        defaultValue: value,
        register: register,
        trigger: trigger,
        errors: errors,
      };
      return [...oldArray, newField];
    });
  };
  const [modal, setModal] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  useEffect(() => {
    if (entity) {
      setNewField("name", "text", entity.name);

      if (entity.jsonData) {
        const customFields = entity.jsonData[0];
        for (const [key, value] of Object.entries(customFields)) {
          setNewField(key, "text", value);
        }
      }
    }
  }, [entity]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();
  const onSubmit = () => {
    alert("success", "Success save");
    reset();
  };

  const addFieldHandler = (newField) => {
    if (newField.trim() !== "") {
      setNewField(newField, "text", "");
    }
  };

  const toggle = () => setModal(!modal);
  return (
    <>
      <div>
        <h2 className="page-subtitle">{formName}</h2>
        <Form onSubmit={handleSubmit(onSubmit)} className="form--custom">
          {inputFields.map((field, i) => (
            <FieldComponent
              key={i}
              name={field.name}
              id={field.id}
              type={field.type}
              defaultValue={field.defaultValue}
              register={field.register}
              trigger={field.trigger}
              errors={errors}
            />
          ))}
          {addFieldBtn && (
            <FormGroup row>
              <Col sm={2} className="offset-md-2">
                <button className="ui-btn ui-btn-primary" onClick={toggle}>
                  Add field
                </button>
              </Col>
            </FormGroup>
          )}
          {attachedImages && <AttachedImages images={images}></AttachedImages>}
          <FormGroup row>
            <Col sm={4} className="offset-md-2">
              <div className="btn-toolbar ">
                <button className="ui-btn ui-btn-primary" className="me-3" type="submit">
                  Submit
                </button>
                <button type="reset">Cancel</button>
              </div>
            </Col>
          </FormGroup>
        </Form>
        <AddFieldModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          addFieldHandler={addFieldHandler}
        ></AddFieldModal>
      </div>
    </>
  );
};
export default FormComponent;
FormComponent.defaultProps = {
  images: [],
};
