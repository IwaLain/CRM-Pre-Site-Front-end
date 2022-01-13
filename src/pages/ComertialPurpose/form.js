import React from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import Profile from "../../js/api/profile";
import { validation } from "../../js/helpers/validation";
import { alert } from "../../js/helpers/alert";

const ComertialForm = ({
  dataForm,
  currentData,
  togglePDF,
  modalPDF,
  resetForm,
}) => {
  const { trigger, errors, register, quote, date, handleSubmit } = dataForm;

  const onSubmit = (e) => {
    const data = {
      billTo: e.bill,
      shipTo: e.ship,
      expires: e.expires,
      memo: e.memo,
      date: date,
      quote: quote,
      items: currentData,
    };

    Profile.createPdf(data, date).then((data) => {
      alert("success", "PDF successful created!");
    });
    resetForm();
  };

  const onError = () => {
    if (modalPDF) {
      togglePDF();
    }
  };

  return (
    <Row>
      <Form id="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="purpose__form justify-content-between">
          <Col md={6} className="purpose__form-quote">
            <FormGroup className="purpose__quote">
              <Col>
                <h3>Quote #</h3>
              </Col>
              <input
                name="quote"
                type="text"
                disabled
                className="ui-kit__input"
                value={quote}
              />
            </FormGroup>
            <FormGroup className="purpose__ship">
              <Label className="form__require">Bill to</Label>
              <textarea
                name="bill"
                type="text"
                rows="4"
                placeholder="Enter your bill"
                className={`ui-kit__textarea form-control ${
                  errors.bill ? "is-invalid" : ""
                }`}
                {...register("bill", validation("address"))}
                onKeyUp={() => {
                  trigger("bill");
                }}
              />
              <Label className="form__require">Ship to</Label>
              <textarea
                name="ship"
                type="text"
                rows="4"
                placeholder="Enter your ship"
                className={`ui-kit__textarea form-control ${
                  errors.ship ? "is-invalid" : ""
                }`}
                {...register("ship", validation("address"))}
                onKeyUp={() => {
                  trigger("ship");
                }}
              />
            </FormGroup>
          </Col>
          <Col md={5} className="purpose__description">
            <Row className="purpose__info">
              <Col>
                <Label>Date</Label>
              </Col>
              <Col className="text-end">{date}</Col>
            </Row>
            <Row className="purpose__info my-2">
              <Col>
                <Label className="form__require">Expires</Label>
              </Col>
              <Col>
                <input
                  name="expires"
                  type="text"
                  placeholder="Expires"
                  className={`ui-kit__textarea form-control ${
                    errors.expires ? "is-invalid" : ""
                  }`}
                  {...register("expires", validation("text"))}
                  onKeyUp={() => {
                    trigger("expires");
                  }}
                />
              </Col>
            </Row>
            <Row className="purpose__info">
              <Col>
                <Label className="form__require">Memo</Label>
              </Col>
              <Col>
                <input
                  name="memo"
                  type="text"
                  placeholder="Memo"
                  className={`ui-kit__textarea form-control ${
                    errors.memo ? "is-invalid" : ""
                  }`}
                  {...register("memo", validation("text"))}
                  onKeyUp={() => {
                    trigger("memo");
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

ComertialForm.propTypes = {
  dataForm: PropTypes.object,
  currentData: PropTypes.array,
};

export default ComertialForm;
