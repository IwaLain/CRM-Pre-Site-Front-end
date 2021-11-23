import React from 'react'
import { alert } from '../../../../js/methods/alert';
import { user } from '../../../../js/api/user';
import FormUser from '../FormUser/FormUser';

export const EditeUserModal = ({currentUser, editeUser}) => {
    const onSubmit = (e) => {
        const data = {
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password
        }

        const role = {
            'roleName': e.role,
        }

        editeUser(currentUser.id, data)

        user.editeUser(currentUser.id, data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                alert('success', 'Edit User successful')
            }
        })

        user.editUserRole(currentUser.id, role)
        .then(data => console.log(data))
    };

    return (
        <div>
            <FormUser title='Edit User' onSubmit={onSubmit} currentUser={currentUser}/>
        </div>
    )
}

export default EditeUserModal