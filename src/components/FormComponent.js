import React from "react";
import { Form, FormGroup, Label, Button, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import FieldComponent from "./FieldComponent";
import { alert } from "../js/methods/alert";
import "react-toastify/dist/ReactToastify.css";
const FormComponent = (props) => {
  const formProps = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
  ];
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
  return (
    <>
      <h1>Form</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formProps.map((field, i) => (
          <FieldComponent
            name={field.name}
            id={field.id}
            type={field.type}
            defaultValue={field.defaultValue}
            register={register}
            trigger={trigger}
            errors={errors}
          />
        ))}{" "}
        <FormGroup row>
          {" "}
          <Col sm={10}>
            <div className="btn-toolbar ">
              <Button color="primary" className="me-3" type="submit">
                Submit
              </Button>
              <Button type="reset">Cancel</Button>
            </div>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};
export default FormComponent;
