import React from 'react'
import { alert } from '../../../../js/helpers/alert';
import User from '../../../../js/api/users';
import UserModal from '../UserModal/UserModal';
import { useForm } from 'react-hook-form';

const UserAdd = ({ toggle, modal, changeTable }) => {

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm()

    const dataInput = {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    }

    const onSubmit = (e) => {
        const data = {
            'first_name': e.firstname,
            'last_name': e.lastname,
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password
        }

        User.addUser(data)
        .then(data => {
            if(data.errors) {
                for (let key in data.errors) {
                    alert('error', data.errors[key])
                }
            } else {
                changeTable(data.users)
                alert('success', 'Add User successful')
            }
        })
    };

    return (
        <div>
            <UserModal
                type='Add User' 
                toggle={toggle}
                modal={modal}
                method={onSubmit}
                data={dataInput}
            />
        </div>
    )
}

export default UserAdd
