import React, { useEffect, useReducer } from 'react'
import {
    Button,
        Col,
        Row,
    } from 'reactstrap'
import User from '../../../js/api/users'

import UserTable from './table'
import UserModal from './modal'
import { reducer } from '../../../reducer'

import '../../../scss/Users.scss'

const UsersPage = () => {

    const initialState = {
        users: [],
        modalAddUser: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const {users, modalAddUser} = state

    const toggleAddUser = () => dispatch({modalAddUser: !modalAddUser})

    const changeTable = (usersList) => dispatch({users: usersList})
    const editeTable = (userId, data) => dispatch({users: users.map(userData => userData.id === userId ? {...data, userId: data} : userData)})

    useEffect(() => {
        User.get()
        .then(data => dispatch({users: data.user}))
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
                        <div className='users__title-img'>
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

            {
                modalAddUser
                ?
                <UserModal
                    type='Add User'
                    method={changeTable}
                    toggle={toggleAddUser}
                    modal={modalAddUser}
                />
                :
                ''
            }
        </div>
    )
}

export default UsersPage
