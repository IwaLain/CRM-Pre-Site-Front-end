import React from 'react';
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { validation } from '../../../../js/methods/validation';
import { errorsValidation } from '../../../../js/methods/message';
import './FormUser.scss'
import { inputs } from '../../../../js/methods/input';
import { useForm } from 'react-hook-form';

const FormUser = ({ title, onSubmit}) => {
    const { handleSubmit, register, trigger, formState: { errors }} = useForm()
    const data = {
        register,
        handleSubmit,
        fieldState: { errors },
        trigger,
    }

    const fields = [
        'username',
        'email',
        'phone',
        'password'
    ]

    return (
        <div>
            <h3>{title}</h3>
            <Row>
                <Col lg={12} className='formUser'>
                    <Form
                        id='formUser-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {inputs('username', data, 'Username')}
                        {inputs('email', data, 'Email')}
                        {inputs('phone', data, 'Phone')}
                        {inputs('password', data, 'Password')}
                        <Row className='formUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='formUser__label'>Role</Label>
                            </Col>
                            <Col md={4}>
                                <select
                                    className='form-control'
                                    name='role'
                                    {...register("role", validation('role'))}
                                >
                                    <option value='' defaultChecked disabled>
                                        Select role
                                    </option>
                                    <option value='member'>
                                        member
                                    </option>
                                    <option value='SuperAdmin'>
                                        SuperAdmin
                                    </option>
                                    <option value='manager'>
                                        manager
                                    </option>
                                </select>
                                {errorsValidation(errors.role, 'Select role')}
                            </Col>
                        </Row>
                        <FormGroup className='formUser__item mt-5'>
                            <Col md={{offset: 2, size: 2}} lg={{offset: 1, size: 2}}>
                                <Button className='formUser__submit'>Submit</Button>
                            </Col>
                            <Col md={3}>
                                <Button
                                    className='formUser__cancel'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById("formUser-form").reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
                {/* <ToastContainer position='bottom-right'/> */}
            </Row>
        </div>
    )
}

export default FormUser
