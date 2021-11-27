import React from 'react'
import { Button, Col, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import './UserModal.scss'
import FormUser from '../UserForm/UserForm'

const ModalUser = ({title, toggle, modal, onSubmit, currentUser}) => {
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader className='modal__head'>
                {title}
                <span
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={toggle}
                ></span>
            </ModalHeader>
            <ModalBody>
                <FormUser
                    currentUser={currentUser}
                    onSubmit={onSubmit}
                />
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
                                form='formUser-form'
                            >
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
            </ModalFooter>
        </Modal>
    )
}

export default ModalUser
