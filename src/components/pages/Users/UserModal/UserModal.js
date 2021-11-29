import React from 'react'
import { Button, Col, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import './UserModal.scss'
import AddUser from '../UserAdd/UserAdd'
import UserEdit from '../UserEdit/UserEdit'
import ProfileEdit from '../../Profile/ProfileEdit/ProfileEdit'

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
                        changeTable={method}
                    />
                    : "Edit User" ?
                    <UserEdit
                        currentUser={currentUser}
                        editeMethod={method}
                    />
                    :
                    <ProfileEdit
                        currentUser={currentUser}
                        editeMethod={method}
                    />
                }
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
