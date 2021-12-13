import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import User from "../../../../js/api/users";
import "./UserTable.scss";
import UserModal from "../UserModal/UserModal";
import DataTable from "react-data-table-component";
import Loader from "../../../../js/helpers/loader";
import { alert } from "../../../../js/helpers/alert";

const UserTable = ({ users, editeTable, changeTable }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [modalEditUser, setModalEditUser] = useState(false);

  const toggleEditUser = () => setModalEditUser(!modalEditUser);
  const current = (currentUser) => setCurrentUser(currentUser);

  const deleteUser = (userId) => {
    console.log(currentUser)
    if (currentUser.role !== 'SuperAdmin') {
      User.delete(userId).then((data) => {
        changeTable(data.users);
        alert("success", `Successful deleted user`);
      });
    } else {
      alert("error", 'Can`t delete Super Admin');
    }
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
    },
    {
      name: "Last Name",
      selector: (row) => isEmpty(row["last_name"]),
    },
    {
      name: "UserName",
      selector: (row) => isEmpty(row["username"]),
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row) => isEmpty(row["email"]),
    },
    {
      name: "Phone",
      selector: (row) => isEmpty(row["phone"]),
    },
    {
      name: "Role",
      selector: (row) => isEmpty(row["role"]),
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
          direction="auto"
          columns={columns}
          data={users}
          defaultSortField="title"
          progressComponent={<Loader />}
          responsive
          pagination
          subHeaderAlign="right"
          customStyles={customStyles}
        />
      </Col>
      <UserModal
        type="Edit User"
        currentUser={currentUser}
        method={editeTable}
        toggle={toggleEditUser}
        modal={modalEditUser}
      />
    </Row>
  );
};

export default UserTable;
