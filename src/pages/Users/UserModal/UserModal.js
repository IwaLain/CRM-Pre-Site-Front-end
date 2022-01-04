import React, { 
    useEffect, 
    useState } from 'react'
import { 
    Button, 
    Col, 
    FormGroup, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row } from 'reactstrap'
import './UserModal.scss'
import AddUser from '../UserAdd/UserAdd'
import UserEdit from '../UserEdit/UserEdit'
import ProfileEdit from '../../Profile/ProfileEdit/ProfileEdit'

const UserModal = ({type, toggle, modal, method, currentUser = ''}) => {
    const [formComponent, setFormComponent] = useState({});
    const [formTitle, setFormTitle] = useState({});

    useEffect(() => {
        switch (type) {
            case 'Add User':
                setFormComponent(<AddUser changeTable={method} />)
                setFormTitle('Add User')
                break;
            case 'Edit User':
                setFormComponent(<UserEdit currentUser={currentUser} editeMethod={method} />)
                setFormTitle('Edit User')
                break;
            case 'Edit Profile':
                setFormComponent(<ProfileEdit toggle={toggle} currentUser={currentUser} editeMethod={method} />)
                setFormTitle('Edit Profile')
                break;
            default:
                break;
        }
    }, [type, currentUser])
    

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader className='modal__head'>
                <Row>
                    <Col>
                        {formTitle}
                    </Col>
                    <span
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={toggle}>
                    </span>
                </Row>
            </ModalHeader>
            <ModalBody>
                {formComponent}
            </ModalBody>
            <ModalFooter>
                <FormGroup md={12} className='formUser__buttons'>
                    <Row>
                        <Col md={6}>
                            <Button
                                className='formUser__cancel'
                                onClick={toggle}>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <Button
                                className='formUser__submit'
                                form='form'>
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
