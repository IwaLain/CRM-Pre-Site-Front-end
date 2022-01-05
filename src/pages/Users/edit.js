import React from 'react'
import { Row } from 'reactstrap';
import User from '../../js/api/users';
import PropTypes from "prop-types";
import { alert } from '../../js/helpers/alert';
import Forms from './form';

const UserEdit = ({ currentUser, editeMethod, toggle }) => {

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
       
        let isSuccess = false
        
        User.editRole(currentUser.id, data)
        .then(data => {
            if(data.success) isSuccess = true
        })

        User.edite(currentUser.id, data)
        .then(data => data.success ? isSuccess = true : isSuccess = false)

        if (currentUser.role !== 'SuperAdmin') {
            editeMethod(currentUser.id, data)
            alert('success', 'Edit User successful')
        } else {
            alert('error', 'Can`t change Super Admin')
        }

        toggle()
    };

    return (
        <div>
            <Row>
                <Forms 
                    onSubmit={onSubmit} 
                    currentUser={currentUser}
                    type={'edit'}
                />
            </Row>
        </div>
    )
}

UserEdit.propTypes = {
    currentUser: PropTypes.object,
    editeMethod: PropTypes.func,
    toggle: PropTypes.func,
}

export default UserEdit