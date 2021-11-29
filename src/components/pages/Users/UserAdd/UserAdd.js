import React from 'react'
import { alert } from '../../../../js/helpers/alert';
import InputForm from '../../../../js/helpers/input';
import { ToastContainer } from 'react-toastify';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import User from '../../../../js/api/users';
import { useForm } from 'react-hook-form';

const AddUser = ({ changeTable }) => {
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
            <Row>
                <Col>
                    <Form
                        id='form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>First Name:</Label>
                                    <InputForm
                                        type={'firstname'}
                                        data={dataInput}
                                        errors={errors.firstname}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Lust Name:</Label>
                                    <InputForm
                                        type={'lastname'}
                                        data={dataInput}
                                        errors={errors.lastname}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>User Name:</Label>
                                    <InputForm
                                        type={'username'}
                                        data={dataInput}
                                        errors={errors.username}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Email:</Label>
                                    <InputForm
                                        type={'email'}
                                        data={dataInput}
                                        errors={errors.email}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>Phone:</Label>
                                    <InputForm
                                        type={'phone'}
                                        data={dataInput}
                                        errors={errors.phone}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Password:</Label>
                                    <InputForm
                                        type={'password'}
                                        data={dataInput}
                                        errors={errors.password}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <ToastContainer position='bottom-right'/>
        </div>
    )
}

export default AddUser
