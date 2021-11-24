import React from 'react'
import { alert } from '../../../../js/methods/alert';
import { user } from '../../../../js/api/users';
import ModalUser from '../ModalUser/ModalUser';

const EditeUser = ({currentUser, toggle, modal}) => {
    const onSubmit = (e) => {
        const data = {
            'first_name': e.firstname,
            'last_name': e.lastname,
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
                modal={modal}
            />
        </div>
    )
}

export default EditeUser