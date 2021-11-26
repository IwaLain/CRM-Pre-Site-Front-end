import React from 'react'
import { alert } from '../../../../js/helpers/alert';
import { user } from '../../../../js/api/users';
import ModalUser from '../ModalUser/ModalUser';

const EditeUser = ({currentUser, toggle, modal, editeTable}) => {
    const onSubmit = (e) => {
        const data = {
            'id': currentUser.id,
            'first_name': e.firstname,
            'last_name': e.lastname,
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password,
            'role': e.role,
        }

        user.editeUser(currentUser.id, data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                alert('success', 'Edit User successful')
            }
        })

        user.editUserRole(currentUser.id, data)
        
        editeTable(currentUser.id, data)
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