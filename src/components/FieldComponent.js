import React from "react";
import { Label, FormGroup } from "reactstrap";
const FieldComponent = (props) => {
  const { id, name, type, register, trigger, errors } = props;

  return (
    <FormGroup>
      <Label>{name}</Label>
      <input
        id={id}
        name={name}
        type={type}
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
    </FormGroup>
  );
};

export default FieldComponent;
