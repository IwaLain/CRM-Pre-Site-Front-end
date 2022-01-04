import React from 'react'
import Profile from '../../js/api/profile'
import PropTypes from 'prop-types'
import User from '../../js/api/users'
import { alert } from '../../js/helpers/alert'
import Forms from '../Users/form'

const ProfileEdit = ({ currentUser, editeMethod, toggle }) => {
  const onSubmit = (e) => {
    const data = {
      id: currentUser.id,
      first_name: e.firstname,
      last_name: e.lastname,
      username: e.username,
      email: e.email,
      phone: e.phone,
      role: e.role
    }

    Profile.updateProfile(currentUser.id, data).then((data) => {
      if (!data) {
        alert('error', 'Something went wrong')
      } else {
        alert('success', 'Profile seccess edited')
      }
    })

    if (currentUser.role !== 'SuperAdmin') User.editRole(currentUser.id, data)

    editeMethod(data)
    toggle()
  }

  return (
    <div>
      <Forms onSubmit={onSubmit} currentUser={currentUser} type="profile" />
    </div>
  )
}

ProfileEdit.propTypes = {
  currentUser: PropTypes.object,
  editeMethod: PropTypes.func,
  toggle: PropTypes.func
}

export default ProfileEdit
