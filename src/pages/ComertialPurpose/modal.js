import React from 'react'
import { 
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader 
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
                Preview PDF
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
                <Button
                    onClick={togglePDF}
                >
                    Close
                </Button>
                <Button className="btn btn-success purposePreview__button" id="purpose" form="form">
                    <i className="fas fa-file-pdf"></i> Create PDF
                </Button>
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
