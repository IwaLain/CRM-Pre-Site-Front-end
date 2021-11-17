import React from "react";
import { Label, FormGroup, Col } from "reactstrap";
const FieldComponent = (props) => {
  const { id, name, type, defaultValue, register, trigger, errors } = props;

  return (
    <FormGroup row>
      <Label sm={2}>{name}</Label>{" "}
      <Col sm={10}>
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          {...register(`${id}`, {
            required: `${name} is Required`,
          })}
          onKeyUp={() => {
            trigger(`${id}`);
          }}
          className="form-control"
        />{" "}
        {errors[id] && (
          <small className="text-danger">{errors[id].message}</small>
        )}
      </Col>
    </FormGroup>
  );
};

export default FieldComponent;
