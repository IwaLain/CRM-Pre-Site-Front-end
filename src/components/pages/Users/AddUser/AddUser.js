import React from 'react'
import { profile } from '../../../../js/api/profile';
import { alert } from '../../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import FormUser from '../FormUser/FormUser';
import { Col } from 'reactstrap';

const AddUserPage = () => {

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

        profile.addUser(data)
        .then(data => {
            if(data.errors) {
                for (let key in data.errors) {
                    alert('error', data.errors[key])
                }
            } else {
                alert('success', 'Add User successful')
            }
        })
    };

    return (
        <div>
            <Col md={4}>
                <FormUser title='Add User' onSubmit={onSubmit}/>
            </Col>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default AddUserPage
