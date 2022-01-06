import React from "react";
import { useForm } from "react-hook-form";
import { Col, Form, Label, Row } from "reactstrap";
import PropTypes from "prop-types";
import InputForm from "../../js/helpers/input";

const Forms = ({ onSubmit, currentUser = "", type }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: currentUser.first_name,
      lastname: currentUser.last_name,
      username: currentUser.username,
      email: currentUser.email,
      phone: currentUser.phone,
      role: currentUser.role,
    },
  });

  const dataInput = {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  };

  const formItems = () => {
    return type === "add"
      ? [
          {
            type: "firstname",
            title: "First Name",
            errors: errors.firstname,
            required: 0,
          },
          {
            type: "lastname",
            title: "Last Name",
            errors: errors.lastname,
            required: 0,
          },
          {
            type: "username",
            title: "User Name",
            errors: errors.username,
            required: 1,
          },
          { type: "email", title: "Email", errors: errors.email, required: 1 },
          { type: "phone", title: "Phone", errors: errors.phone, required: 1 },
          {
            type: "password",
            title: "Password",
            errors: errors.password,
            required: 1,
          },
        ]
      : type === "edit"
      ? [
          {
            type: "firstname",
            title: "First Name",
            errors: errors.firstname,
            required: 0,
          },
          {
            type: "lastname",
            title: "Last Name",
            errors: errors.lastname,
            required: 0,
          },
          {
            type: "username",
            title: "User Name",
            errors: errors.username,
            required: 1,
          },
          { type: "email", title: "Email", errors: errors.email, required: 1 },
          { type: "phone", title: "Phone", errors: errors.phone, required: 1 },
          { type: "role", title: "Role", errors: errors.role, required: 0 },
        ]
      : type === "profile"
      ? [
          {
            type: "firstname",
            title: "First Name",
            errors: errors.firstname,
            required: 0,
          },
          {
            type: "lastname",
            title: "Last Name",
            errors: errors.lastname,
            required: 0,
          },
          {
            type: "username",
            title: "User Name",
            errors: errors.username,
            required: 1,
          },
          { type: "email", title: "Email", errors: errors.email, required: 1 },
          { type: "phone", title: "Phone", errors: errors.phone, required: 1 },
        ]
      : null;
  };

  return (
    <Row>
      <Form id="form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {formItems().map((el, index) =>
            el.type !== "role" ? (
              <Col className="forms__item" md={6} key={index}>
                <Label className={el.required ? "form__require" : ""}>
                  {el.title}:
                </Label>
                <InputForm type={el.type} data={dataInput} errors={el.errors} />
              </Col>
            ) : (
              <Col className="forms__item" md={6}>
                <Label className="w-100">Role:</Label>
                <select
                  className="ui-kit__select w-100 p-2"
                  {...register("role")}
                >
                  <option disabled selected>
                    {" "}
                    Select role
                  </option>
                  <option value="manager">manager</option>
                  <option value="member">member</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </select>
              </Col>
            )
          )}
        </Row>
      </Form>
    </Row>
  );
};

Forms.propTypes = {
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};

export default Forms;
