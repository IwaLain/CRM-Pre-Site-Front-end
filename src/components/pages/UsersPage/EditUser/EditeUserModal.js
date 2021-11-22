import React from 'react'
import './EditUser.scss'
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { alert } from '../../../../js/methods/alert';
import { user } from '../../../../js/api/user';
import { errorsValidation, validation } from '../../../../js/methods/validation';

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
        }

        const role = {
            'roleName': e.role,
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
        
        user.editUserRoleAPI(currentUser.id, role)
        .then(data => console.log(data))
    };

    return (
        <Form
            id='editUser-form'
            className=''
            onSubmit={handleSubmit(onSubmit)}
        >
            <Row className='editUser__item mt-3'>
                <Col md={2}>
                    <Label className='editUser__label'>Username</Label>
                </Col>
                <Col md={10}>
                    <input
                        type='text'
                        placeholder='...'
                        className={`form-control ${errors.username && "invalid"}`}
                        {...register("username", validation('username') )}
                        onKeyUp={(e) => {
                            trigger("username");
                        }}
                    />
                    {errorsValidation(errors.username, 'Include any simvols')}
                </Col>
            </Row>
            <Row className='editUser__item'>
                <Col md={2}>
                    <Label className='editUser__label'>Email</Label>
                </Col>
                <Col md={10}>
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
            <Row className='editUser__item'>
                <Col md={2}>
                    <Label className='editUser__label'>Phone</Label>
                </Col>
                <Col md={10}>
                    <input
                        type="text"
                        placeholder='...'
                        className={`form-control ${errors.phone && "invalid"}`}
                        {...register("phone", validation('phone'))}
                        onKeyUp={() => {
                            trigger("phone");
                        }}
                    />
                    {errorsValidation(errors.phone, 'Begin with "+" and split "-", "/" or "."')}
                </Col>
            </Row>
            <Row className='editUser__item'>
                <Col md={2}>
                    <Label className='editUser__label'>Role</Label>
                </Col>
                <Col md={10}>
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
            <FormGroup className='editUser__item mt-5 d-flex justify-content-md-between'>
                <Col md={2}>
                    <Button className='editUser__submit'>Submit</Button>
                </Col>
                <Col md={2}>
                    <Button
                        className='editUser__cancel'
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById("editUser-form").reset();
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