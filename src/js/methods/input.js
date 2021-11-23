import { Col, Label, Row } from "reactstrap"
import { errorsValidation } from "./message"
import { validation } from "./validation"
import '../../scss/components/inputs.scss'

export const inputs = (type, data, label, errors, message = '') => {
    const { register, trigger } = data
    return (
        <div>
            <Row className='form__item'>
                <Col md={2} lg={1}>
                    <Label className='form__label'>{label}</Label>
                </Col>
                <Col md={12}>
                    <input
                        type={type}
                        placeholder='...'
                        className={`form-control ${errors ? 'is-invalid' : ''}`}
                        {...register(type, validation(type) )}
                        onKeyUp={() => {
                            trigger(type)
                        }}
                    />
                    {errorsValidation(errors, message)}
                </Col>
            </Row>
        </div>
    )
}

export const select = (type, data, label) => {
    const { register } = data
    return (
        <div>
            <Row className='form__item'>
                <Col md={2} lg={1}>
                    <Label className='form__label'>{label}</Label>
                </Col>
                <Col md={12}>
                    <select 
                        className='form-control'
                        name={type}
                        {...register(type, validation(type))}
                    >
                        <option value='' defaultChecked disabled>
                            Select
                        </option>
                        <option value='member'>
                            member
                        </option>
                        <option value='SuperAdmin'>
                            SuperAdmin
                        </option>
                        <option value='manager'>
                            manager
                        </option>
                    </select>
                </Col>
            </Row>
        </div>
    )
}