import React from 'react';
import { Col, Form, Row } from "reactstrap";
import './FormUser.scss'
import { inputs, select } from '../../../../js/methods/input';
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
            username: currentUser.username,
            email: currentUser.email,
            phone: currentUser.phone,
            role: currentUser.role,
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
                        {inputs( 'username', data, 'Username', errors.username )}
                        {inputs( 'email', data, 'Email', errors.email )}
                        {inputs( 'phone', data, 'Phone', errors.phone )}
                        {select( 'role', data, 'Role', errors.role )}
                    </Form>
                </Col>
            </Row>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default FormUser
