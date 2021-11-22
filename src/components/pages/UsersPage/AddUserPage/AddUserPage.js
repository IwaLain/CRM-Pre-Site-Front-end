import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap"
import './AddUserPage.scss'
import { user } from '../../../../js/api/user';
import { alert } from '../../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import { errorsValidation, validation } from '../../../../js/methods/validation';

const AddUserPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (e) => {
        const data = {
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'password': e.password
        }

        user.addUserAPI(data)
        .then(data => {
            if(data.errors) {
                console.log(data.errors)
                for (let key in data.errors) {
                    alert('error', data.errors[key])
                }
            } else {
                alert('success', 'Add User successful')
                reset()
            }
        })
    };

    return (
        <div>
            <h3>Add User</h3>
            <Row>
                <Col lg={12} className='addUser'>
                    <Form
                        id='addUser-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row className='addUser__item mt-3'>
                            <Col md={2} lg={1}>
                                <Label className='addUser__label'>Username</Label>
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
                        <Row className='addUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='addUser__label'>Email</Label>
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
                        <Row className='addUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='addUser__label'>Phone</Label>
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
                        <Row className='addUser__item'>
                            <Col md={2} lg={1}>
                                <Label className='addUser__label'>Password</Label>
                            </Col>
                            <Col md={4}>
                                <input
                                    type="password"
                                    placeholder='Password ...'
                                    className={`form-control ${errors.password && "invalid"}`}
                                    {...register("password", validation('password') )}
                                    onKeyUp={() => {
                                        trigger("password");
                                    }}
                                />
                                {errorsValidation(errors.password, 'Password should contain special character')}
                            </Col>
                        </Row>
                        <FormGroup className='addUser__item mt-5'>
                            <Col md={{offset: 2, size: 2}} lg={{offset: 1, size: 2}}>
                                <Button className='addUser__submit'>Submit</Button>
                            </Col>
                            <Col md={3}>
                                <Button
                                    className='addUser__cancel'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById("addUser-form").reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
                <ToastContainer position='bottom-right'/>
            </Row>
        </div>
    )
}

export default AddUserPage
