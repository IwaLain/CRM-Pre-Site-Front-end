import React from 'react'
import { user } from '../../../../js/api/users';
import { alert } from '../../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import ModalUser from '../ModalUser/ModalUser';

const AddUserPage = () => {

    const onSubmit = (e) => {
        const data = {
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password
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
            <Col lg={3}>
                <ModalUser 
                    title='Add User' 
                    onSubmit={onSubmit} 
                />
            </Col>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default AddUserPage
