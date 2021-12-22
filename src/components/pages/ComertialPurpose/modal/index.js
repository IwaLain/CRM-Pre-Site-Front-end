import React from 'react'
import { 
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader 
} from 'reactstrap'
import Previews from '../preview'

const ComertialModal = ({togglePDF, preview, date}) => {
    const {previewData, currentData, previewList, quote, modalPDF} = preview
    
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
                    preview={preview}
                    form={previewData}
                    table={currentData}
                    items={previewList}
                    date={date}
                    quote={quote}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={togglePDF}
                    className="purposePreview__button"
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ComertialModal
