import React from 'react'
import { useForm } from 'react-hook-form';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import User from '../../../../js/api/users';
import { alert } from '../../../../js/helpers/alert';
import InputForm from '../../../../js/helpers/input';

const UserEdit = ({ currentUser, editeMethod }) => {
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
            'password': e.password,
            'role': e.role,
        }

        User.edite(currentUser.id, data)
        .then(data => {
            if(data.success) {
                alert('success', 'Edit User successful')
            } else {
                alert('error', 'You cant edite Super Admin')
            }
        })

        User.editRole(currentUser.id, data)
        .then(data => {
            if(data.success) {
                alert('success', 'Edit Role successful')
            } else {
                alert('error', 'You cant change role Super Admin')
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
                                    <Label className='w-100'>Role:</Label>
                                    <select 
                                        className='ui-kit__select w-100'
                                        {...register('role')}
                                    >
                                        <option disabled selected> Select role</option>
                                        <option value='manager'>manager</option>
                                        <option value='member'>member</option>
                                        <option value='SuperAdmin'>SuperAdmin</option>
                                    </select>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UserEdit