import React, { useEffect, useReducer } from 'react'
import { Col, Row } from 'reactstrap'
import User from '../../js/api/users'

import UserTable from './table'
import UserModal from './modal'
import { reducer } from '../../reducer'
import Loader from '../../js/helpers/loader'

import './Users.scss'
import Button from '../../ui/buttons'

const UsersPage = () => {
  const initialState = {
    users: [],
    modalAddUser: false,
    isLoading: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { users, modalAddUser, isLoading } = state

  const toggleAddUser = () => dispatch({ modalAddUser: !modalAddUser })

  const changeTable = (usersList) => dispatch({ users: usersList })
  const editeTable = (userId, data) =>
    dispatch({
      users: users.map((userData) =>
        userData.id === userId ? { ...data, userId: data } : userData
      )
    })

  useEffect(() => {
    dispatch({ isLoading: true })
    User.get().then((data) => {
      dispatch({ users: data.user })
      dispatch({ isLoading: false })
    })
  }, [])

  return (
    <div className="users">
      <Row className="align-items-center justify-content-xs-between">
        <Col lg={1} md={2} sm={2} xs={6}>
          <h3 className="users__title">Users</h3>
        </Col>
        <Col md={6} sm={3} xs={6} className="users__button">
          <Button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              toggleAddUser()
            }}
          >
            <i className="fas fa-user-plus"></i> Add User
          </Button>
        </Col>
      </Row>

      {!isLoading ? (
        <UserTable editeTable={editeTable} changeTable={changeTable} users={users} />
      ) : (
        <div className='users__loader'>
          <Loader />
        </div>
      )}

      {modalAddUser ? (
        <UserModal
          type="Add User"
          method={changeTable}
          toggle={toggleAddUser}
          modal={modalAddUser}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default UsersPage
