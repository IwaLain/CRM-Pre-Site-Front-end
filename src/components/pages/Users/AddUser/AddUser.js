import React from 'react'
import { user } from '../../../../js/api/user';
import { alert } from '../../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import FormUser from '../FormUser/FormUser';
import { Col, Row } from 'reactstrap';

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

        user.addUser(data)
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
