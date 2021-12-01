import React, { useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import User from '../../../../js/api/users'
import './UserTable.scss'
import UserModal from '../UserModal/UserModal'
import DataTable from "react-data-table-component";
import Loader from '../../../../js/helpers/loader'
import { render } from 'react-dom'

const UserTable = ( { users, editeTable }) => {
    const [currentUser, setCurrentUser] = useState([])
    const [modalEditUser, setModalEditUser] = useState(false)

    const toggleEditUser = () => setModalEditUser(!modalEditUser)
    const current = (currentUser) => setCurrentUser(currentUser)

    const deleteUser = (userId) => {
        User.deleteUser(userId)
        .then(data => console.log(data))
    }

    render() {
        const columns = [
            {
                name: 'First Name',
                selector: 'first_name',
                sortable: true,
            },
            {
                name: 'Last Name',
                selector: 'last_name',
                sortable: true,
            },
            {
                name: 'UserName',
                selector: 'username',
            },
            {
                name: 'Email Address',
                selector: 'email',
            },
            {
                name: 'Phone',
                selector: 'phone',
            },
            {
                name: 'Role',
                selector: 'role',
            },
            {
                name: '',
                selector: 'edit',
            },
            {
                name: '',
                selector: 'delete',
            },
        ];
    }

    return (
        <Row className='mt-5'>
            <Col md={12}>
                <DataTable
                    columns={columns}
                    data={users}
                    defaultSortField="title"
                    progressComponent={<Loader />}
                    pagination
                />
                {/* <Table hover responsive striped>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>UserName</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table-users'>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td data-label='First Name'>{user.first_name}</td>
                                <td data-label='Last Name'>{user.last_name}</td>
                                <td data-label='UserName'>{user.username}</td>
                                <td data-label='Email Address'>{user.email}</td>
                                <td data-label='Phone'>{user.phone}</td>
                                <td data-label='Role'>{user.role}</td>
                                <td data-label='Edit'>
                                    <i
                                        class="fas fa-edit users-table__img"
                                        alt="edite"
                                        onClick={() => {
                                                toggleEditUser(true)
                                                current(user)
                                            }
                                        }
                                    ></i>
                                </td>
                                <td data-label='Delite'>
                                    <i
                                        class="fas fa-trash users-table__img"
                                        alt="delete"
                                        onClick={() => {
                                            deleteUser(user.id)
                                        }}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> */}
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
