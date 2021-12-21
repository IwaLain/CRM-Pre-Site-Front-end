import React from 'react'
import { useForm } from 'react-hook-form';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import Profile from '../../../../js/api/profile';
import User from '../../../../js/api/users';
import { alert } from '../../../../js/helpers/alert';
import InputForm from '../../../../js/helpers/input';

const ProfileEdit = ({currentUser, editeMethod, toggle}) => {
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
        }
    })

    const dataInput = {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    }

    const onSubmit = (e) => {
        const data = {
            'id': currentUser.id,
            'first_name': e.firstname,
            'last_name': e.lastname,
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'role': e.role
        }

        Profile.updateProfile(currentUser.id, data).then(data => {
            if (!data) {
                alert('error', 'Something went wrong')
            } else {
                toggle()
                alert('success', 'Profile seccess edited')
            }
        })

        if (currentUser.role !== 'SuperAdmin') User.editRole(currentUser.id, data)
    
        editeMethod(data)
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
                                    <Label className=''>Last Name:</Label>
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
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ProfileEdit