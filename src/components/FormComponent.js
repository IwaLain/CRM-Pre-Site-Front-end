import React, { useState } from "react";
import { Form, FormGroup, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import FieldComponent from "./FieldComponent";
import { alert } from "../js/methods/alert";
import "react-toastify/dist/ReactToastify.css";
import "../scss/components/form-component.scss";
import AttachedImages from "./AttachedImages";
const FormComponent = ({
  formFields,
  formName,
  addFieldBtn,
  attachedImages,
  images,
}) => {
  const [inputFields, setInputFields] = useState(formFields);
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
  const addFieldHandler = () => {
    setInputFields((oldArray) => {
      const newElement = {
        id: oldArray.length + 1,
        name: "Label title",
        type: "text",
        register: register,
        trigger: trigger,
        errors: errors,
      };

      return [...oldArray, newElement];
    });
  };
  return (
    <>
      <div>
        <h1>{formName}</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="form--custom">
          {inputFields.map((field, i) => (
            <FieldComponent
              key={i}
              name={field.name}
              id={field.id}
              type={field.type}
              defaultValue={field.defaultValue}
              register={register}
              trigger={trigger}
              errors={errors}
            />
          ))}{" "}
          {addFieldBtn && (
            <FormGroup row>
              <Col sm={2} className="offset-md-2">
                <Button color="primary" onClick={addFieldHandler}>
                  Add field
                </Button>
              </Col>
            </FormGroup>
          )}
          {attachedImages && <AttachedImages images={images}></AttachedImages>}
          <FormGroup row>
            {" "}
            <Col sm={4} className="offset-md-2">
              <div className="btn-toolbar ">
                <Button color="primary" className="me-3" type="submit">
                  Submit
                </Button>
                <Button type="reset">Cancel</Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};
export default FormComponent;
FormComponent.defaultProps = {
  images: [],
};
