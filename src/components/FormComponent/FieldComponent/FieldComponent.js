import React from "react";
import { Label, FormGroup, Col } from "reactstrap";
const FieldComponent = (props) => {
  const {
    id,
    name,
    type,
    defaultValue,
    register,
    trigger,
    errors,
    isRequired,
  } = props;
  const required = isRequired
    ? {
        ...register(`${id}`, {
          required: `${name} is Required`,
        }),
      }
    : "";
  return (
    <FormGroup row>
      <Label sm={2}>{name}</Label>
      <Col sm={10}>
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          {...required}
          onKeyUp={() => {
            trigger(`${id}`);
          }}
          className="form-control"
        />
        {errors[id] && (
          <small className="text-danger validation-error">
            {errors[id].message}
          </small>
        )}
      </Col>
    </FormGroup>
  );
};

export default FieldComponent;
FieldComponent.defaultProps = { isRequired: false };
