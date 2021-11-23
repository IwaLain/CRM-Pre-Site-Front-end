import React from 'react';
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { validation } from '../../../../js/methods/validation';
import { errorsValidation } from '../../../../js/methods/message';
import './FormUser.scss'
import { inputs, select } from '../../../../js/methods/input';
import { useForm } from 'react-hook-form';

const FormUser = ({ title, onSubmit}) => {
    const { handleSubmit, register, trigger, formState: { errors }} = useForm()
    const data = {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    }

    return (
        <div>
            <h3>{title}</h3>
            <Row>
                <Col lg={12} className='formUser'>
                    <Form
                        id='formUser-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {inputs( 'username', data, 'Username', errors.username )}
                        {inputs( 'email', data, 'Email', errors.email )}
                        {inputs( 'phone', data, 'Phone', errors.phone )}
                        {inputs( 'password', data, 'Password', errors.password )}
                        {select( 'role', data, 'Role', errors.role )}

                        <FormGroup className='formUser__item mt-5'>
                            <Col md={{offset: 2, size: 6}}>
                                <Button className='formUser__submit'>Submit</Button>
                            </Col>
                            <Col md={6}>
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
