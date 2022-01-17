import React, { useContext } from "react";
import { alert } from "../../js/helpers/alert";
import User from "../../js/api/users";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Form from "./form";
import { GlobalContext } from "../../context";

const UserAdd = ({ changeTable, toggle }) => {
  const { setSubmitPreventer } = useContext(GlobalContext)

  const onSubmit = (e) => {
    setSubmitPreventer(true);
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
    setSubmitPreventer(false);
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
