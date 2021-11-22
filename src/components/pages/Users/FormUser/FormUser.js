import React from 'react';
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { validation } from '../../../../js/methods/validation';
import { errorsValidation } from '../../../../js/methods/message';
import './FormUser.scss'

const FormUser = ({ title, onSubmit, data }) => {
    const { handleSubmit, register, trigger, formState: { errors }} = data
    return (
        <div>
            <h3>{title}</h3>
            <Row>
                <Col lg={12} className='formUser'>
                    <Form
                        id='formUser-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row className='formUser__item mt-3'>
                            <Col md={2} lg={1}>
                                <Label className='formUser__label'>Username</Label>
                            </Col>
                            <Col md={4}>
                                <input
                                    type='text'
                                    placeholder='...'
                                    className={`form-control ${errors.username && "invalid"}`}
                                    {...register("username", validation('username') )}
                                    onKeyUp={() => {
                                        trigger("username");
                                    }}
                                />
                                {errorsValidation(errors.username, 'Include any simvols')}
                            </Col>
                        </Row>
                        <Row className='formUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='formUser__label'>Email</Label>
                            </Col>
                            <Col md={4}>
                                <input
                                    type="email"
                                    placeholder='...'
                                    className={`form-control ${errors.email && "invalid"}`}
                                    {...register("email", validation('email') )}
                                    onKeyUp={() => {
                                        trigger("email");
                                    }}
                                />
                                {errorsValidation(errors.email, 'Dont forget "@"')}
                            </Col>
                        </Row>
                        <Row className='formUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='formUser__label'>Phone</Label>
                            </Col>
                            <Col md={4}>
                                <input
                                    type="text"
                                    placeholder='...'
                                    className={`form-control ${errors.phone && "invalid"}`}
                                    {...register("phone", validation('phone') )}
                                    onKeyUp={() => {
                                        trigger("phone");
                                    }}
                                />
                                {errorsValidation(errors.phone, 'Begin with "+" and split "-", "/" or "."')}
                            </Col>
                        </Row>
                        <Row className='formUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='formUser__label'>Password</Label>
                            </Col>
                            <Col md={4}>
                                <input
                                    type="password"
                                    placeholder='...'
                                    className={`form-control ${errors.password && "invalid"}`}
                                    {...register("password", validation('password') )}
                                    onKeyUp={() => {
                                        trigger("password");
                                    }}
                                />
                                {errorsValidation(errors.password, 'Password should contain special character')}
                            </Col>
                        </Row>
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
