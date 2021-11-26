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
import AddUser from './AddUser/AddUser'

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
        user.getUsers()
        .then(data => setUsers(data.user))
    }, [])

    console.log(users)

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

            <TableUser
                changeTable={changeTable}
                editeTable={editeTable}
                users={users}
                modal={modalEditUser}
                toggle={toggleEditUser}
            />
            <AddUser
                changeTable={changeTable}
                toggle={toggleAddUser}
                modal={modalAddUser}
            />
        </>
    )
}

export default UsersPage
