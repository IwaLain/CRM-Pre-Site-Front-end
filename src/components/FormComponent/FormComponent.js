import React, { useState } from "react";
import { Form, FormGroup, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import FieldComponent from "./FieldComponent/FieldComponent";
import { alert } from "../../js/methods/alert";
import "react-toastify/dist/ReactToastify.css";
import "./form-component.scss";
import AttachedImages from "./AttachedImages/AttachedImages";
import AddFieldModal from "../AddFieldModal/AddFieldModal";

const FormComponent = ({
  formFields,
  formName,
  addFieldBtn,
  attachedImages,
  images,
}) => {
  const [modal, setModal] = useState(false);
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

  const addFieldHandler = (newField) => {
    if (newField.trim() !== "") {
      setInputFields((oldArray) => {
        const newElement = {
          id: oldArray.length + 1,
          name: newField,
          type: "text",
          register: register,
          trigger: trigger,
          errors: errors,
        };

        return [...oldArray, newElement];
      });
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
              register={register}
              trigger={trigger}
              errors={errors}
            />
          ))}{" "}
          {addFieldBtn && (
            <FormGroup row>
              <Col sm={2} className="offset-md-2">
                <Button color="primary" onClick={toggle}>
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
