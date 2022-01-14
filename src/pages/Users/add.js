import React from "react";
import { alert } from "../../js/helpers/alert";
import User from "../../js/api/users";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Form from "./form";

const UserAdd = ({ changeTable, toggle }) => {
  const onSubmit = (e) => {
    const data = {
      first_name: e.firstname,
      last_name: e.lastname,
      username: e.username,
      email: e.email,
      phone: e.phone,
      password: e.password,
    };

    User.create(data).then((data) => {
      if (data.errors) {
        for (let key in data.errors) {
          alert("error", data.errors[key]);
        }
      } else {
        changeTable(data.users);
        alert("success", "User added");
        toggle();
      }
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit} type={"add"} />
    </div>
  );
};

UserAdd.propTypes = {
  changeTable: PropTypes.func,
  toggle: PropTypes.func,
};

export default UserAdd;
