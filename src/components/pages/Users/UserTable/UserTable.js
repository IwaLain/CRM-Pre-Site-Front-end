import React, { useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import User from '../../../../js/api/users'
import './UserTable.scss'
import UserModal from '../UserModal/UserModal'
import DataTable from "react-data-table-component";
import Loader from '../../../../js/helpers/loader'

const UserTable = ( { users, editeTable }) => {
    const [currentUser, setCurrentUser] = useState([])
    const [modalEditUser, setModalEditUser] = useState(false)

    const toggleEditUser = () => setModalEditUser(!modalEditUser)
    const current = (currentUser) => setCurrentUser(currentUser)

    const deleteUser = (userId) => {
        User.deleteUser(userId)
    }

    const columns = [
        {
            name: 'First Name',
            selector: row => row['first_name'],
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row['last_name'],
            sortable: true,
        },
        {
            name: 'UserName',
            selector: row => row['username'],
            sortable: true,
        },
        {
            name: 'Email Address',
            selector: row => row['email'],
        },
        {
            name: 'Phone',
            selector: row => row['phone'],
        },
        {
            name: 'Role',
            selector: row => row['role'],

        },
        {
            cell: row => <i
                className="fas fa-edit users-table__img"
                alt="edite"
                onClick={() => {
                        toggleEditUser(true)
                        console.log(row)
                        current(row)
                    }
                }
            ></i>,
            right: true,
            grow: 0
        },
        {
            cell: row => <i
                className="fas fa-trash users-table__img"
                alt="delete"
                onClick={() => {
                    deleteUser(row.id)
                }}
            ></i>
        },
    ];

    return (
        <Row className='mt-5'>
            <Col md={12}>
                <DataTable
                    direction="auto"
                    columns={columns}
                    data={users}
                    defaultSortField="title"
                    progressComponent={<Loader />}
                    pagination
                    subHeaderWrap
                />
            </Col>
            <UserModal
                type='Edit User'
                currentUser={currentUser}
                method={editeTable}
                toggle={toggleEditUser}
                modal={modalEditUser}
            />
        </Row>
    )
}

export default UserTable
