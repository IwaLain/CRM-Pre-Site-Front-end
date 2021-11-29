import React from 'react'
import { Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import './UserModal.scss'
import InputForm from '../../../../js/helpers/input'
import { useForm } from 'react-hook-form'

const UserModal = ({type, toggle, modal, method, currentUser = '', data}) => {
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
                                    <Label className=''>Password:</Label>
                                    <InputForm
                                        type={'password'}
                                        data={dataInput}
                                        errors={errors.password}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            </ModalBody>
            <ModalFooter>
                <FormGroup md={12} className='formUser__buttons'>
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
                    </FormGroup>
            </ModalFooter>
        </Modal>
    )
}

export default UserModal
