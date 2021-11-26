import React from 'react'
import { alert } from '../../../../js/helpers/alert';
import { ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import ModalUser from '../ModalUser/ModalUser';
import User from '../../../../js/api/users';

const AddUser = ({ toggle, modal, changeTable }) => {

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
            <Col lg={3}>
                <ModalUser
                    title='Add User'
                    onSubmit={onSubmit}
                    toggle={toggle}
                    modal={modal}
                />
            </Col>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default AddUser
