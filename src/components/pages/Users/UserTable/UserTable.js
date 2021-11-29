import React, { useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import edite from '../../../../assets/img/edite.svg'
import del from '../../../../assets/img/delete.svg'
import User from '../../../../js/api/users'
import './UserTable.scss'
import UserModal from '../UserModal/UserModal'

const UserTable = ( { users, editeTable}) => {
    const [currentUser, setCurrentUser] = useState([])
    const [modalEditUser, setModalEditUser] = useState(false)

    const toggleEditUser = () => setModalEditUser(!modalEditUser)
    const current = (currentUser) => setCurrentUser(currentUser)

    const deleteUser = (userId) => {
        User.deleteUser(userId)
        .then(data => console.log(data))
    }

    return (
        <Row className='mt-5'>
            <Col md={12}>
                <Table hover responsive striped>
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
                                    <img
                                        className='users-table__img'
                                        src={edite}
                                        alt="edite"
                                        onClick={() => {
                                                toggleEditUser(true)
                                                current(user)
                                            }
                                        }
                                    />
                                </td>
                                <td data-label='Delite'>
                                    <img
                                        className='users-table__img'
                                        src={del}
                                        alt="delete"
                                        onClick={() => {
                                            deleteUser(user.id)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <UserModal
                type='Edit Profile'
                currentUser={currentUser}
                method={editeTable}
                toggle={toggleEditUser}
                modal={modalEditUser}
            />
        </Row>
    )
}

export default UserTable
