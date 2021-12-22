import React, { useContext, useReducer } from 'react'
import {
      Button,
      Col,
      Row
  } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import './ComertialPurpose.scss'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import ComertialTable from './table';
import ComertialForm from './form';
import ComertialModal from './modal';
import { GlobalContext } from '../../../context';

const ComertialPurpouse = () => {
    const { customerNetwork } = useContext(GlobalContext);

    const dataValid = (checkData) => {
        const data = [];
        for (const [key, value] of Object.entries(checkData)) {
            console.log(key, value)
            if (value.length > 0) {
              data.push({
                item: key,
                description: "",
                units: "EA",
                quantity: value.length,
                price: "",
                cost: 0,
              });
            }
        }
        return data.length > 0
    }

    const reducer = (state, updates) => ({...state, ...(updates || {})});

    const initialState = {
        quote: 'Q' + Math.floor(Date.now() / 1000),
        currentData: [],
        previewData: [],
        modalPDF: false,
        previewList: {
            description: '-',
            quantity: '',
            cost: 0,
            units: '',
            item: '',
            price: 0,
        }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const {quote, currentData, previewData, modalPDF, previewList} = state

    const date = new Date().toLocaleDateString('en-US')

    const togglePDF = () => dispatch({modalPDF: !modalPDF});
    const changeCurrentData = (newData) => dispatch({currentData: newData})
    
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

    const preview = {
        previewData,
        currentData,
        previewList,
        date,
        quote,
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
                <Col lg={4} md={5} sm={6} className='purpose__adress'>
                    Waites Sensor Techologies, Inc.<br/>
                    20 W. 11th St. Suite 200<br/>
                    Covington, KY 41011<br/>

                    <div className="mt-3">(800)574-9248 www.waites.net</div>
                </Col>
            </Row>

            <Row>
                <ComertialForm 
                    dataForm={dataForm}
                    currentData={currentData}
                />
            </Row>

            <Row className="purpose__table">
                <ComertialTable
                    setData={changeCurrentData}
                    dataForm={dataForm}
                />
            </Row>
            
            {
                dataValid(customerNetwork)
                ? 
                <Row className='purpose__buttons'>
                    <Col lg={2} md={2}>
                        <Button
                            form='form'
                            onClick={(e) => {
                                e.preventDefault()

                                dispatch({previewData: getValues()})
                                dispatch({previewList: currentData})

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
                :
                ''
            }
            

            <ComertialModal 
                modalPDF={modalPDF}
                togglePDF={togglePDF}
                preview={preview}
            />
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default ComertialPurpouse