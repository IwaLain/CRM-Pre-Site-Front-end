import React, { useEffect, useState } from 'react'
import {
        Button,
        Col,
        Row,
    } from 'reactstrap'
import star from '../../../assets/img/star.svg'
import './Users.scss'
import User from '../../../js/api/users'
import UserTable from './UserTable/UserTable'
import UserAdd from './UserAdd/UserAdd'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [modalAddUser, setModalAddUser] = useState(false)
    const [modalEditUser, setModalEditUser] = useState(false)

    const toggleAddUser = () => setModalAddUser(!modalAddUser)
    const toggleEditUser = () => setModalEditUser(!modalEditUser)

    const changeTable = (usersList) => setUsers(usersList)
    const editeTable = (userId, data) => {
        setUsers(users.map(userData => userData.id === userId ? {...data, userId: data} : userData))
    }

    useEffect(() => {
        User.getUsers()
        .then(data => setUsers(data.user))
    }, [])

    return (
        <>
            <Row className='align-items-center justify-content-xs-between'>
                <Col lg={1} md={2} sm={2} xs={6}>
                    <h3 className='users__title'>Users</h3>
                </Col>
                <Col md={6} sm={3} xs={6} className='users__button'>
                    <Button onClick={toggleAddUser}>
                        Add User
                        <img className='users__title-img' src={star} alt="star"/>
                    </Button>
                </Col>
            </Row>

            <UserTable
                changeTable={changeTable}
                editeTable={editeTable}
                users={users}
                modal={modalEditUser}
                toggle={toggleEditUser}
            />
            <UserAdd
                changeTable={changeTable}
                toggle={toggleAddUser}
                modal={modalAddUser}
            />
        </>
    )
}

export default UsersPage
