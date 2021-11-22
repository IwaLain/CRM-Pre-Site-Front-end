import React from 'react'
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { alert } from './alert';
import { user } from '../api/user';

export const EditeUserModal = ({currentUser, editeUser}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm( {
        defaultValues: {
            username: currentUser.username,
            email: currentUser.email,
            phone: currentUser.phone,
            role: currentUser.role
        }
    });

    const onSubmit = (e) => {
        const data = { 
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'role': e.role
        }

        editeUser(currentUser.id, data)
        
        user.editeUserAPI(currentUser.id, data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                alert('success', 'Add User successful')
            }
        })

        user.editUserRoleAPI(currentUser.id, data.role)
    };

    return (
        <Form
            id='addUser-form'
            className=''
            onSubmit={handleSubmit(onSubmit)}
        >
            <Row className='addUser__item mt-3'>
                <Col md={2}>
                    <Label className='addUser__label'>Username</Label>
                </Col>
                <Col md={10}>
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
                        onKeyUp={(e) => {
                            trigger("username");
                        }}
                    />
                    {errors.username
                        ? (<small className="addUser__desc text-danger">{errors.username.message}</small>)
                        : (<small className='addUser__desc text-muted'>Include any simvols</small>)}
                </Col>
            </Row>
            <Row className='addUser__item'>
                <Col md={2}>
                    <Label className='addUser__label'>Email</Label>
                </Col>
                <Col md={10}>
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
                <Col md={2}>
                    <Label className='addUser__label'>Phone</Label>
                </Col>
                <Col md={10}>
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
                <Col md={2}>
                    <Label className='addUser__label'>Role</Label>
                </Col>
                <Col md={10}>
                    <select
                        className='form-control'
                        name='role'
                        {...register("role")}
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
                    <small className='addUser__desc text-muted'>Select role</small>
                </Col>
            </Row>
            <FormGroup className='addUser__item mt-5 d-flex justify-content-md-between'>
                <Col md={2}>
                    <Button className='addUser__submit'>Submit</Button>
                </Col>
                <Col md={2}>
                    <Button
                        className='addUser__cancel'
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById("addUser-form").reset();
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default EditeUserModal