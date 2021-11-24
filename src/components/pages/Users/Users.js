import React, { useEffect, useState } from 'react'
import {
        Button,
        Col,
        Row,
    } from 'reactstrap'
import star from '../../../assets/img/star.svg'
import './Users.scss'
import { user } from '../../../js/api/users'
import TableUser from './TableUser/TableUser'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    
    const toggle = () => setModal(!modal)
    
    useEffect(() => {
        user.getUsers()
        .then(data => setUsers(data.user))
    }, [])
    return (
        <>
            <Row className='align-items-center justify-content-xs-between'>
                <Col lg={1} md={2} sm={2} xs={6}>
                    <h3 className='users__title'>Users</h3>
                </Col>
                <Col md={6} sm={6} xs={6}>
                    <Button onClick={toggle}>
                        Add User
                        <img className='users__title-img' src={star} alt="star"/>
                    </Button>
                </Col>
            </Row>

            <TableUser 
                users={users}
                modal={modal}
                toggle={toggle}
            />
        </>
    )
}

export default UsersPage
