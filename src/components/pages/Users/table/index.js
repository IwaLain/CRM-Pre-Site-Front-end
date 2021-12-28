import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import User from "../../../../js/api/users";
import "../../../../scss/UserTable.scss";
import UserModal from "../modal";
import DataTable from "react-data-table-component";
import Loader from "../../../../js/helpers/loader";
import { alert } from "../../../../js/helpers/alert";

const UserTable = ({ users, editeTable, changeTable }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [modalEditUser, setModalEditUser] = useState(false);

  const toggleEditUser = () => setModalEditUser(!modalEditUser);
  const current = (currentUser) => setCurrentUser(currentUser);

  const deleteUser = (userId) => {
    User.delete(userId).then((data) => {
      if (data.success) {
        changeTable(data.users);
        alert("success", `Successful deleted user`);
      } else {
        alert("error", 'Can`t delete Super Admin');
      }
    });
  };

  const isEmpty = (cell) => (cell === null ? "--" : cell === "" ? "--" : cell);

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => isEmpty(row["first_name"]),
      maxWidth: "200px",
    },
    {
      name: "Last Name",
      selector: (row) => isEmpty(row["last_name"]),
      maxWidth: "200px",
    },
    {
      name: "UserName",
      selector: (row) => isEmpty(row["username"]),
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Email Address",
      selector: (row) => isEmpty(row["email"]),
      maxWidth: "300px"
    },
    {
      name: "Phone",
      selector: (row) => isEmpty(row["phone"]),
      maxWidth: "200px"
    },
    { 
      name: "Role",
      selector: (row) => isEmpty(row["role"]),
      maxWidth: "200px",
    },
    {
      cell: (row) => (
        <i
          className="fas fa-edit users-table__img"
          alt="edite"
          onClick={() => {
            toggleEditUser(true);
            current(row);
          }}
        ></i>
      ),
      right: true,
      grow: 0,
    },
    {
      cell: (row) => (
        <i
          className="fas fa-trash users-table__img"
          alt="delete"
          onClick={() => {
            deleteUser(row.id);
          }}
        ></i>
      ),
      grow: 0,
    },
  ];

  return (
    <Row className="mt-3">
      <Col md={12}>
        <DataTable
          columns={columns}
          data={users}
          defaultSortField="title"
          progressComponent={<Loader />}
          responsive
          pagination={users.length > 10 ? true : false}
          subHeaderAlign="right"
          customStyles={customStyles}
        />
      </Col>
      {
        modalEditUser
        ?
        <UserModal
          type="Edit User"
          currentUser={currentUser}
          method={editeTable}
          toggle={toggleEditUser}
          modal={modalEditUser}
        />
        :
        ''
      }
      
    </Row>
  );
};

UserTable.propTypes = {
  users: PropTypes.array,
  editeTable: PropTypes.func,
  changeTable: PropTypes.func,
}

export default UserTable;