import React, { useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import edite from '../../../../assets/img/edite.svg'
import EditeUser from '../EditUser/EditeUser'

const TableUser = ( { users, modal }) => {
    const [currentUser, setCurrentUser] = useState([])
    const current = (user) => setCurrentUser(user)

    return (
        <Row className='mt-5'>
            <Col lg={8} md={10} sm={12}>
                <Table hover responsive striped>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='customerTable'>
                        {users.map(user => (
                            <tr key={user.id}>
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
                                                modal(true)
                                                current(user)
                                            }
                                        }
                                    />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <EditeUser 
                currentUser={currentUser} 
                toggle={modal}
            />
        </Row>
    )
}

export default TableUser
