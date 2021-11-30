import React, { useContext, useEffect, useState } from 'react'
import {
        Button,
        Col,
        Row,
    } from 'reactstrap'
import star from '../../../assets/img/star.svg'
import './Users.scss'
import User from '../../../js/api/users'
import UserTable from './UserTable/UserTable'
import UserModal from './UserModal/UserModal'
import { GlobalContext } from '../../../context'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [modalAddUser, setModalAddUser] = useState(false)
    const {userProfile} = useContext(GlobalContext)

    const toggleAddUser = () => setModalAddUser(!modalAddUser)

    const changeTable = (usersList) => setUsers(usersList)
    const editeTable = (userId, data) => {
        setUsers(users.map(userData => userData.id === userId ? {...data, userId: data} : userData))
    }

    useEffect(() => {
        User.getUsers()
        .then(data => setUsers(data.user))
    }, [])
    console.log(userProfile)
    return (
        <>
            <Row className='align-items-center justify-content-xs-between'>
                <Col lg={1} md={2} sm={2} xs={6}>
                    <h3 className='users__title'>Users</h3>
                </Col>
                <Col md={6} sm={3} xs={6} className='users__button'>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        toggleAddUser()
                    }}>
                        Add User
                        <div users__title-img>
                            <i class="fas fa-user-plus"></i>
                        </div>
                    </Button>
                </Col>
            </Row>

            <UserTable
                editeTable={editeTable}
                users={users}
            />

            <UserModal
                type='Add User'
                method={changeTable}
                toggle={toggleAddUser}
                modal={modalAddUser}
            />
        </>
    )
}

export default UsersPage
