import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'
import star from '../assets/img/star.svg'
import edite from '../assets/img/edite.svg'
import '../scss/components/userpage.scss'

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        getUsers()
    }, [])

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h3 className='users__title'>Customers Table</h3>
                </Col>
                <Col>
                    <Button>Add User<img className='users__title-img' src={star} alt="star"/></Button>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={8}>
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
                                        <img className='users__table-img' src={edite} alt="edite" />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UsersPage
