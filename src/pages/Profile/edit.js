import React, { useContext } from "react";
import Profile from "../../js/api/profile";
import PropTypes from "prop-types";
import User from "../../js/api/users";
import { alert } from "../../js/helpers/alert";
import Forms from "../Users/form";
import { GlobalContext } from "../../context";

const ProfileEdit = ({ currentUser, editeMethod, toggle }) => {
  const { setSubmitPreventer } = useContext(GlobalContext)

  const onSubmit = (e) => {
    setSubmitPreventer(true);

    const data = {
      id: currentUser.id,
      first_name: e.firstname,
      last_name: e.lastname,
      username: e.username,
      email: e.email,
      phone: e.phone,
      role: currentUser.role,
    };

    Profile.updateProfile(currentUser.id, data).then((data) => {
      if (!data) {
        alert("error", "Something went wrong");
      } else {
        alert("success", "Profile successfully edited");
      }
      setSubmitPreventer(false);
    });

    if (currentUser.role !== "SuperAdmin") User.editRole(currentUser.id, data);

    editeMethod(data);
    toggle();
  };

  return (
    <div>
      <Forms onSubmit={onSubmit} currentUser={currentUser} type="profile" />
    </div>
  );
};

ProfileEdit.propTypes = {
  currentUser: PropTypes.object,
  editeMethod: PropTypes.func,
  toggle: PropTypes.func,
};

export default ProfileEdit;
