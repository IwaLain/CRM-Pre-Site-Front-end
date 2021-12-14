import React, { useEffect, useState } from 'react'
import {
    Button,
        Col,
        Row,
    } from 'reactstrap'
import './Users.scss'
import User from '../../../js/api/users'
import UserTable from './UserTable/UserTable'
import UserModal from './UserModal/UserModal'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [modalAddUser, setModalAddUser] = useState(false)

    const toggleAddUser = () => setModalAddUser(!modalAddUser)

    const changeTable = (usersList) => setUsers(usersList)
    const editeTable = (userId, data) => {
        setUsers(users.map(userData => userData.id === userId ? {...data, userId: data} : userData))
    }

    useEffect(() => {
        User.get()
        .then(data => setUsers(data.user))
    }, [])
    
    return (
        <div className='Users'>
            <Row className='align-items-center justify-content-xs-between'>
                <Col lg={1} md={2} sm={2} xs={6}>
                    <h3 className='users__title'>Users</h3>
                </Col>
                <Col md={6} sm={3} xs={6} className='users__button'>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            toggleAddUser()
                        }
                    }>

                        <div calassName='users__title-img'>
                            Add User <i className="fas fa-user-plus"></i>
                        </div>
                    </Button>
                </Col>
            </Row>

            <UserTable
                editeTable={editeTable}
                changeTable={changeTable}
                users={users}
            />

            <UserModal
                type='Add User'
                method={changeTable}
                toggle={toggleAddUser}
                modal={modalAddUser}
            />
        </div>
    )
}

export default UsersPage
