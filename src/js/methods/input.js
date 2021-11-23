import { Col, Label, Row } from "reactstrap"
import { errorsValidation } from "./message"
import { validation } from "./validation"

export const inputs = (type, data, label, errors, message = '') => {
    const { register, trigger } = data
    return (
        <div>
            <Row className='form__item mt-3'>
                <Col md={2} lg={1}>
                    <Label className='form__label'>{label}</Label>
                </Col>
                <Col md={12}>
                    <input
                        type={type}
                        placeholder='...'
                        className={`form-control ${errors && 'invalid'}`}
                        {...register(type, validation(type) )}
                        onKeyUp={() => {
                            console.log(errors)
                            trigger(type)
                        }}
                    />
                    {errorsValidation(errors, 'Include any simvols')}
                </Col>
            </Row>
        </div>
    )
}

export const select = (type, data, label, errors) => {
    const { register, trigger } = data
    return (
        <div>
            <Row className='form__item mt-3'>
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
                            Select role
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
                    {errorsValidation(errors, 'Select role')}
                </Col>
            </Row>
        </div>
    )
}