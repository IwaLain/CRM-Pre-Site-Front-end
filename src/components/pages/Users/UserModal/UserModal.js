import React from 'react'
import { Button, Col, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import './UserModal.scss'
import AddUser from '../UserAdd/UserAdd'
import UserEdit from '../UserEdit/UserEdit'

const UserModal = ({title, toggle, modal, method, currentUser}) => {
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
                {title === "Add User" ?
                    <AddUser
                        changeTable={method.changeTable}
                    />
                    :
                    <UserEdit
                        currentUser={currentUser}
                        editeMethod={method.editeTable}
                    />
                }
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
