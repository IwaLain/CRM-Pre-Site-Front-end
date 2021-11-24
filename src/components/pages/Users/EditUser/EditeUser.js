import React from 'react'
import { alert } from '../../../../js/methods/alert';
import { user } from '../../../../js/api/users';
import ModalUser from '../ModalUser/ModalUser';

const EditeUser = ({currentUser, toggle}) => {
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
            <ModalUser 
                title='Edit User' 
                onSubmit={onSubmit} 
                currentUser={currentUser} 
                toggle={toggle}
            />
        </div>
    )
}

export default EditeUser