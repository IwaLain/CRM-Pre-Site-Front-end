import React, { 
    useEffect, 
    useReducer} from 'react'
import { 
    button, 
    Col, 
    FormGroup, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row } from 'reactstrap'
import PropTypes from "prop-types";

import { reducer } from '../../reducer'

import UserAdd from './add'
import UserEdit from './edit'
import ProfileEdit from '../Profile/edit'

const UserModal = ({type, toggle, modal, method, currentUser = ''}) => {
    const initialState = {
        formComponent: {},
        formTitle: {}
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const {formComponent, formTitle} = state

    useEffect(() => {
        switch (type) {
            case 'Add User':
                dispatch({formComponent: <UserAdd toggle={toggle} changeTable={method} />})
                dispatch({formTitle: 'Add User'})
                break;
            case 'Edit User':
                dispatch({formComponent: <UserEdit toggle={toggle} currentUser={currentUser} editeMethod={method} />})
                dispatch({formTitle: 'Edit User'})
                break;
            case 'Edit Profile':
                dispatch({formComponent: <ProfileEdit toggle={toggle} currentUser={currentUser} editeMethod={method} />})
                dispatch({formTitle: 'Edit Profile'})
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
                    <Col md={12}>
                        {formTitle}
                    </Col>
                    <Col>
                        <span
                            type="button"
                            className="modal-close"
                            aria-label="Close"
                            onClick={toggle}>
                                <i class="fas fa-times"></i>
                        </span>
                    </Col>
                </Row>
            </ModalHeader>
            <ModalBody>
                {formComponent}
            </ModalBody>
            <ModalFooter>
                <FormGroup md={12} className='formUser__buttons'>
                    <Row>
                        <Col md={6}>
                            <button
                                className='formUser__cancel ui-btn ui-btn-secondary'
                                onClick={toggle}>
                                Cancel
                            </button>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <button
                                className='formUser__submit ui-btn ui-btn-primary'
                                form='form'>
                                Submit
                            </button>
                        </Col>
                    </Row>
                </FormGroup>
            </ModalFooter>
        </Modal>
    )
}

UserModal.propTypes = {
    type: PropTypes.string,
    toggle: PropTypes.func,
    modal: PropTypes.bool,
    method: PropTypes.func,
    currentUser: PropTypes.object
}

export default UserModal
