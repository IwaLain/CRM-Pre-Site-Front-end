import React, { useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import edite from '../../../../assets/img/edite.svg'
import del from '../../../../assets/img/delete.svg'
import EditeUser from '../EditUser/EditeUser'
import { user } from '../../../../js/api/users'
import AddUser from '../AddUser/AddUser'

const TableUser = ( { users, modal, toggle }) => {
    const [currentUser, setCurrentUser] = useState([])

    const current = (currentUser) => setCurrentUser(currentUser)
    const deleteUser = (userId) => user.deleteUser(userId)

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
                    <tbody className='customerTable'>
                        {users.map(user => (
                            <tr key={user.id}>
                                <th>{user.first_name}</th>
                                <th>{user.last_name}</th>
                                <th>{user.username}</th>
                                <th>{user.email}</th>
                                <th>{user.phone}</th>
                                <th>{user.role}</th>
                                <th>
                                    <img
                                        className='users__table-img'
                                        src={edite}
                                        alt="edite"
                                        onClick={() => {
                                                toggle(true)
                                                current(user)
                                            }
                                        }
                                    />
                                </th>
                                <th>
                                    <img
                                        className='users__table-img'
                                        src={del}
                                        alt="delete"
                                        onClick={() => deleteUser(user.id)}
                                    />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <EditeUser
                currentUser={currentUser}
                toggle={toggle}
                modal={modal}
            />
        </Row>
    )
}

export default TableUser
