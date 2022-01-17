import React, { useContext, useEffect, useReducer } from "react";
import { Col, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import { reducer } from "../../reducer";

import { dataValid } from "./helpers";
import Table from "./table";
import Form from "./form";
import Modal from "./modal";

import "./ComertialPurpose.scss";
import "./ComertialPurposePrint.scss";

import logo from "../../assets/img/waites-block-logo-yellow-background.png";
import customersApi from "../../js/api/customer";
import { GlobalContext } from "../../context";
import { useHistory } from "react-router-dom";
import { alert } from "../../js/helpers/alert";

const ComertialPurpouse = () => {
  const { selectedCustomer, userProfile, submitPreventer, setCurrentPage } =
    useContext(GlobalContext);

  const initialState = {
    quote: "Q" + Math.floor(Date.now() / 1000),
    currentData: [],
    previewData: [],
    customerNetwork: {},
    modalPDF: false,
    previewList: {
      description: "-",
      quantity: "",
      cost: 0,
      units: "",
      item: "",
      price: 0,
    },
    resetTable: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { quote, currentData, modalPDF, customerNetwork, resetTable } = state;

  const history = useHistory();

  const d = new Date();
  const date =
    ("0" + d.getDate()).slice(-2) +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    d.getFullYear();

  const togglePDF = () => dispatch({ modalPDF: !modalPDF });
  const newQuote = () => {
    dispatch({ quote: "Q" + Math.floor(Date.now() / 1000) });
  };
  const changeCurrentData = (newData) => dispatch({ currentData: newData });

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      quote: quote,
    },
  });

  const dataForm = {
    handleSubmit,
    currentData,
    register,
    trigger,
    errors,
    quote,
    reset,
    date,
  };

  const resetForm = () => {
    reset({ ...register, quote: newQuote() });
  };

  useEffect(() => {
    customersApi
      .getNetwork(
        selectedCustomer.id === undefined
          ? userProfile.last_customer
          : selectedCustomer.id
      )
      .then((data) => {
        dispatch({ customerNetwork: data.Network });
      });

    setCurrentPage("cp");
  }, []);

  useEffect(() => {
    if (history && history.location && history.location.pathname) {
      switch (history.location.pathname) {
        case "/purpose":
          if (
            !selectedCustomer ||
            !(Object.keys(selectedCustomer).length > 0)
          ) {
            history.push("/customers");
            alert("error", "You need to select customer first");
          }
          break;
        default:
          break;
      }
    }
  }, [history, selectedCustomer]);

  return (
    <div className="purpose" id="purpose">
      <Row className="justify-content-between">
        <Col md={6} className="purpose__title">
          <h3>Commercial Purpose</h3>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </Col>
        <Col md={5} className="purpose__adress">
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
        resetForm={resetForm}
      />

      <Table
        setData={changeCurrentData}
        dataForm={dataForm}
        customerNetwork={customerNetwork}
      />

      {dataValid(customerNetwork) ? (
        <Row className="purpose__buttons">
          <Col lg={2} md={2}>
            <button
              className="ui-btn ui-btn-info"
              form="form"
              onClick={(e) => {
                e.preventDefault();

                dispatch({ previewData: getValues() });
                dispatch({ previewList: currentData });

                togglePDF(true);
              }}
            >
              <i className="far fa-eye"></i> Preview
            </button>
          </Col>
          <Col lg={2} md={2}>
            <button
              className="submit-btn large ui-btn ui-btn-success"
              id="purpose"
              form="form"
            >
              {submitPreventer ? (
                "..."
              ) : (
                <>
                  <i className="fas fa-file-pdf"></i> Create PDF
                </>
              )}
            </button>
          </Col>
        </Row>
      ) : (
        ""
      )}

      <Modal
        currentData={currentData}
        togglePDF={togglePDF}
        preview={state}
        date={date}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ComertialPurpouse;
