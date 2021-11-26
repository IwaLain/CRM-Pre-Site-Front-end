import React from 'react';
import { Col, Form, Row } from "reactstrap";
import './FormUser.scss'
import { inputs, select } from '../../../../js/helpers/input';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

const FormUser = ({ onSubmit, currentUser = ''}) => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstname: currentUser.first_name,
            lastname: currentUser.last_name,
            username: currentUser.username,
            email: currentUser.email,
            phone: currentUser.phone,
            role: currentUser.role,
            password: currentUser.password,
        }
    });

    const data = {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    }

    return (
        <div>
            <Row>
                <Col lg={12} className='formUser'>
                    <Form
                        id='formUser-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {inputs( 'firstname', data, 'Firstname', errors.firstname )}
                        {inputs( 'lastname', data, 'Lastname', errors.lastname )}
                        {inputs( 'username', data, 'Username', errors.username )}
                        {inputs( 'email', data, 'Email', errors.email )}
                        {inputs( 'phone', data, 'Phone', errors.phone )}
                        {select( 'role', data, 'Role', errors.role )}
                        {inputs( 'password', data, 'Password', errors.password )}
                    </Form>
                </Col>
            </Row>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default FormUser
