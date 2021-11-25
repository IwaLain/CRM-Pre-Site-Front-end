import React from 'react'
import { Button, Col, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import FormUser from '../FormUser/FormUser'

const ModalUser = ({title, toggle, modal, onSubmit, currentUser}) => {
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader>
                {title}
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
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.getElementById("formUser-form").reset();
                                }}
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
