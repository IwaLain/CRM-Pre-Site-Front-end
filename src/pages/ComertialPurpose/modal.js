import React from 'react'
import { 
    button, 
    Col, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row
} from 'reactstrap'
import PropTypes from "prop-types";

import Previews from './preview'

const ComertialModal = ({togglePDF, preview, date, currentData}) => {
    const {previewData, quote, modalPDF} = preview
    
    return (
        <Modal
            isOpen={modalPDF}
            toggle={togglePDF}
            className="purposePreview"
            size='lg'
        >
            <ModalHeader>
                <Row>
                    <Col md={12}>
                        Preview PDF
                    </Col>
                    <Col>
                        <span
                            type="button"
                            className="modal-close"
                            aria-label="Close"
                            onClick={togglePDF}>
                                <i class="fas fa-times"></i>
                        </span>
                    </Col>
                </Row>
            </ModalHeader>
            <ModalBody>
                <Previews 
                    form={previewData}
                    table={currentData}
                    date={date}
                    quote={quote}
                />
            </ModalBody>
            <ModalFooter>
                <button
                    className="ui-btn ui-btn-secondary"
                    onClick={togglePDF}
                >
                    Close
                </button>
                <button className="ui-btn ui-btn-success purposePreview__button" id="purpose" form="form">
                    <i className="fas fa-file-pdf"></i> Create PDF
                </button>
            </ModalFooter>
        </Modal>
    )
}

ComertialModal.propTypes = {
    togglePDF: PropTypes.func,
    preview: PropTypes.object,
    date: PropTypes.string,
}

export default ComertialModal
