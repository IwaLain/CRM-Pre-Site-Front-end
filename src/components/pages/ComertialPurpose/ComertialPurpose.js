import React, { useState } from 'react'
import {
      Button,
      Col,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      Row
  } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import './ComertialPurpose.scss'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Previews from './Preview/Preview';
import ComertialTable from './ComertialTable/ComertialTable';
import ComertialForm from './ComertialForm/ComertialForm';

const ComertialPurpouse = () => {
    const [quote, setQuote] = useState('Q' + Math.floor(Date.now() / 1000))
    const [currentData, setCurrentData] = useState([])
    const [previewData, setPreviewData] = useState([])
    const [priceValid, setPriceValid] = useState({})
    const [modalPDF, setModalPDF] = useState(false);
    const [previewList, setPreviewList] = useState([
        {
            description: '-',
            quantity: '',
            cost: 0,
            units: '',
            item: '',
            price: 0,
        }
    ])

    const date = new Date().toLocaleDateString('en-US')

    const togglePDF = () => setModalPDF(!modalPDF);
    const changeCurrentData = (newData) => setCurrentData(newData)

    const checkPriceValid = (valid) => setPriceValid(valid)

    const {
        formState: { errors },
        handleSubmit,
        getValues,
        register,
        trigger,
    } = useForm({
        defaultValues: {
            quote: quote
        }
    })

    const dataForm = {
        handleSubmit,
        currentData,
        register,
        trigger,
        errors,
        quote,
        date
    }

    return (
        <div className="purpose" id="purpose">
            <Row className='purpose__title-print'>
                <Col lg={4} md={5} sm={6} className="purpose__title">
                    <h3>Commercial Purpose</h3>
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                </Col>
                <Col lg={{offset:1, size:4}} md={5} sm={6} className='purpose__adress'>
                    Waites Sensor Techologies, Inc.<br/>
                    20 W. 11th St. Suite 200<br/>
                    Covington, KY 41011<br/>

                    <div className="mt-3">(800)574-9248 www.waites.net</div>
                </Col>
            </Row>

            <Row>
                <ComertialForm 
                    dataForm={dataForm}
                    priceValid={priceValid}
                    currentData={currentData}
                />
            </Row>

            <Row className="purpose__table">
                <ComertialTable
                    setData={changeCurrentData}
                    dataForm={dataForm}
                />
            </Row>

            <Row className='purpose__buttons'>
                <Col lg={2} md={2}>
                    <Button
                        form='form'
                        onClick={(e) => {
                            e.preventDefault()

                            setPreviewData(getValues())
                            setPreviewList(currentData)

                            togglePDF(true)
                        }}>
                        Preview <i className="far fa-eye"></i>
                    </Button>
                </Col>
                <Col lg={2} md={2}>
                    <Button
                        id='purpose'
                        form='form'>
                        Create PDF <i className="fas fa-file-pdf"></i>
                    </Button>
                </Col>
            </Row>

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
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default ComertialPurpouse