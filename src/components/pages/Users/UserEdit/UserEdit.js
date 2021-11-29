import React from 'react'
import { useForm } from 'react-hook-form';
import User from '../../../../js/api/users';
import { alert } from '../../../../js/helpers/alert';
import UserModal from '../UserModal/UserModal';

const UserEdit = ({ toggle, modal, currentUser, editeMethod}) => {
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

        User.editeUser(currentUser.id, data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                alert('success', 'Edit User successful')
            }
        })

        User.editUserRole(currentUser.id, data)

        editeMethod(currentUser.id, data)
    };

    return (
        <div>
            <UserModal
                type='User Edit' 
                toggle={toggle}
                modal={modal}
                method={editeMethod, onSubmit}
                data={currentUser}
            />
        </div>
    )
}

export default UserEdit