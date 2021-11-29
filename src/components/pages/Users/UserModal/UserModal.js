import React from 'react'
import { Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import './UserModal.scss'
import { errorsValidation, validation } from '../../../../js/helpers/validation'
import { useForm } from 'react-hook-form'

const UserModal = ({type, toggle, modal, method, data}) => {
    const message = ''
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstname: data.first_name,
            lastname: data.last_name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            role: data.role,
            // password: profile.password,
        }
    })

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader className='modal__head'>
                {type}
                <span
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={toggle}
                ></span>
            </ModalHeader>
            <ModalBody>
            <Row>
                <Col>
                    <Form
                        id='form'
                        onSubmit={handleSubmit(method.onSubmit)}
                    >
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>First Name:</Label>
                                    <input
                                        type='text'
                                        placeholder='...'
                                        className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                        {...register('firstname', validation('firstname') )}
                                        onKeyUp={() => {
                                            trigger('firstname')
                                        }}
                                    />
                                    {errorsValidation(errors.firstname, message)}
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Lust Name:</Label>
                                    <input
                                        type='text'
                                        placeholder='...'
                                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                        {...register('lastname', validation('lastname') )}
                                        onKeyUp={() => {
                                            trigger('lastname')
                                        }}
                                    />
                                    {errorsValidation(errors.lastname, message)}
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>User Name:</Label>
                                    <input
                                        type='text'
                                        placeholder='...'
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        {...register('username', validation('username') )}
                                        onKeyUp={() => {
                                            trigger('username')
                                        }}
                                    />
                                    {errorsValidation(errors.username, message)}
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Email:</Label>
                                    <input
                                        type='email'
                                        placeholder='...'
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        {...register('email', validation('email') )}
                                        onKeyUp={() => {
                                            trigger('email')
                                        }}
                                    />
                                    {errorsValidation(errors.email, message)}
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <Label className=''>Phone:</Label>
                                    <input
                                        type='text'
                                        placeholder='...'
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        {...register('phone', validation('phone') )}
                                        onKeyUp={() => {
                                            trigger('phone')
                                        }}
                                    />
                                    {errorsValidation(errors.phone, message)}
                                </Col>
                                <Col md={6}>
                                    <Label className=''>Role:</Label>
                                    <select
                                        className='form-control'
                                    >
                                        <option selected disabled>Select role</option>
                                        <option>member</option>
                                        <option>manager</option>
                                        <option>SuperAdmin</option>
                                    </select>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col className='modal__password' md={6}>
                                    <Label className=''>Password:</Label>
                                    <input
                                        type='password'
                                        placeholder='...'
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        {...register('password', validation('password') )}
                                        onKeyUp={() => {
                                            trigger('password')
                                        }}
                                    />
                                    {errorsValidation(errors.password, message)}
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            </ModalBody>
            <ModalFooter>
                <FormGroup md={12} className='formUser__buttons'>
                    <Row>
                        <Col md={6}>
                            <Button
                                className='formUser__cancel'
                                onClick={toggle}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button
                                className='formUser__submit'
                                form='form'
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </ModalFooter>
        </Modal>
    )
}

export default UserModal
