import React, { useContext, useEffect, useReducer } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

import { reducer } from '../../reducer'

import { dataValid } from './helpers'
import Table from './table'
import Form from './form' 
import Modal from './modal'

import './ComertialPurpose.scss'
import './ComertialPurposePrint.scss'

import logo from '../../assets/img/waites-block-logo-yellow-background.png'
import customersApi from '../../js/api/customer'
import { GlobalContext } from '../../context'

const ComertialPurpouse = () => {
  const { userProfile } = useContext(GlobalContext)

  const initialState = {
    quote: 'Q' + Math.floor(Date.now() / 1000),
    currentData: [],
    previewData: [],
    customerNetwork: {},
    modalPDF: false,
    previewList: {
      description: '-',
      quantity: '',
      cost: 0,
      units: '',
      item: '',
      price: 0
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { quote, currentData, modalPDF, customerNetwork } = state

  const date = new Date().toLocaleDateString('en-US')

  const togglePDF = () => dispatch({ modalPDF: !modalPDF })
  const newQuote = () => {
    dispatch({ quote: 'Q' + Math.floor(Date.now() / 1000) })
  }
  const changeCurrentData = (newData) => dispatch({ currentData: newData })

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    trigger,
    reset
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
    reset,
    date
  }

  useEffect(() => {
    customersApi.getNetwork(userProfile.last_customer)
    .then(data => {
      console.log(data.Network)
      dispatch({customerNetwork: data.Network})
    })
  }, [])

  return (
    <div className="purpose" id="purpose">
      <Row className="purpose__title-print">
        <Col lg={4} md={5} sm={6} className="purpose__title">
          <h3>Commercial Purpose</h3>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </Col>
        <Col lg={4} md={5} sm={6} className="purpose__adress">
          Waites Sensor Techologies, Inc.
          <br />
          20 W. 11th St. Suite 200
          <br />
          Covington, KY 41011
          <br />
          <div className="mt-3">(800)574-9248 www.waites.net</div>
        </Col>
      </Row>

      <Form
        dataForm={dataForm}
        currentData={currentData}
        togglePDF={togglePDF}
        modalPDF={modalPDF}
        newQuote={newQuote}
      />

      <Table 
        setData={changeCurrentData} 
        dataForm={dataForm} 
        customerNetwork={customerNetwork}
      />

      {dataValid(customerNetwork) ? (
        <Row className="purpose__buttons">
          <Col lg={2} md={2}>
            <Button
              className="btn btn-primary"
              form="form"
              onClick={(e) => {
                e.preventDefault()

                dispatch({ previewData: getValues() })
                dispatch({ previewList: currentData })

                togglePDF(true)
              }}
            >
              <i className="far fa-eye"></i> Preview
            </Button>
          </Col>
          <Col lg={2} md={2}>
            <Button className="btn btn-success " id="purpose" form="form">
              <i className="fas fa-file-pdf"></i> Create PDF
            </Button>
          </Col>
        </Row>
      ) : (
        ''
      )}

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
