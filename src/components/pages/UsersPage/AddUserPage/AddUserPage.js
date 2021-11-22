import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap"
import './AddUserPage.scss'
import { user } from '../../../../js/api/user';
import { alert } from '../../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';

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
                                    {...register("username", {
                                        required: "UserName is Required",
                                        minLength: {
                                            value: 3,
                                            message: "Minimum 3 simvols",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("username");
                                    }}
                                />
                                {errors.username
                                    ? (<small className="addUser__desc text-danger">{errors.username.message}</small>)
                                    : (<small className='addUser__desc text-muted'>Include any simvols</small>)}
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
                                    {...register("email", {
                                        required: "Email is Required",
                                        minLength: {
                                            value: 5,
                                            message: "Minimum 5 simvols",
                                        },
                                        pattern: {
                                            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message: "Email must be like exampl@mail.com",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("email");
                                    }}
                                />
                                {errors.email
                                    ? (<small className="addUser__desc text-danger">{errors.email.message}</small>)
                                    : (<small className='addUser__desc text-muted'>Don't forget "@"</small>)
                                }
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
                                    {...register("phone", {
                                        required: "Phone is Required",
                                        minLength: {
                                            value: 9,
                                            message: "Minimum 9 simvols",
                                        },
                                        pattern: {
                                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                                            message: "Phone must be like 555-555-5555",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("phone");
                                    }}
                                />
                                {errors.phone
                                    ? (<small className="addUser__desc text-danger">{errors.phone.message}</small>)
                                    : (<small className='addUser__desc text-muted'>Begin with "+" and split "-", "/" or "."</small>)
                                }
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
                                    {...register("password", {
                                        required: "Password is Required",
                                        minLength: {
                                            value: 4,
                                            message: "Minimum 6 simvols",
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: "Maximum 16 simvols",
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                            message: "Password should contain atleast one number and one special character",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("password");
                                    }}
                                />
                                {errors.password
                                    ? (<small className="addUser__desc text-danger">{errors.password.message}</small>)
                                    : (<small className='addUser__desc text-muted'>Password should contain special character</small>)
                                }
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
