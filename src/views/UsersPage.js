import React, { useEffect, useState } from 'react'
import {
        Button,
        Col,
        Row,
        Table
    } from 'reactstrap'
import star from '../assets/img/star.svg'
import edite from '../assets/img/edite.svg'
import '../scss/components/users-page.scss'
import { NavLink } from 'react-router-dom'
import { getAPI } from '../js/api/remastered'

const UsersPage = () => {
    const [users, setUsers] = useState([])

    
    getAPI.getUsersAPI().then(data => setUsers(data))
    

    return (
        <>
            <Row className='align-items-center justify-content-xs-between'>
                <Col md={2} sm={2} xs={6}>
                    <h3 className='users__title'>Users</h3>
                </Col>
                <Col md={6} sm={6} xs={6}>
                    <NavLink to='/dashboard/add-user'>
                        <Button>Add User<img className='users__title-img' src={star} alt="star"/></Button>
                    </NavLink>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col lg={9} md={12} sm={12}>
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
                                    <th>Admin</th>
                                    <th>
                                        <img
                                            className='users__table-img'
                                            src={edite}
                                            alt="edite"
                                            onClick={() => alert('Ok')}
                                        />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default UsersPage
