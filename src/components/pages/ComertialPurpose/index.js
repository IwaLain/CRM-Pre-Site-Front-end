import React, { useContext, useReducer } from 'react'
import {
      Button,
      Col,
      Row
  } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import { GlobalContext } from '../../../context';
import { reducer } from '../../../reducer';

import { dataValid } from './helpers';
import Table from './table';
import Form from './form';
import Modal from './modal';

import './ComertialPurpose.scss'

import logo from "../../../assets/img/waites-block-logo-yellow-background.png";


const ComertialPurpouse = () => {
    const { customerNetwork } = useContext(GlobalContext);

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
    const {
        quote, 
        currentData, 
        modalPDF, 
    } = state

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
                <Form 
                    dataForm={dataForm}
                    currentData={currentData}
                />
            </Row>

            <Row className="purpose__table">
                <Table
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
        
            <Modal 
                currentData={currentData}
                togglePDF={togglePDF}
                preview={state}
                date={date}
            />
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default ComertialPurpouse