import { Col, Label, Row } from "reactstrap"
import { errorsValidation } from "./message"
import { validation } from "./validation"

export const inputs = (type, data, label) => {
    const { register, trigger, fieldState: { errors } } = data
    return (
        <div>
            {console.log(errors.type)}
            <Row className='form__item mt-3'>
                <Col md={2} lg={1}>
                    <Label className='form__label'>{label}</Label>
                </Col>
                <Col md={4}>
                    <input
                        type={type}
                        placeholder='...'
                        className={`form-control ${errors.type && 'invalid'}`}
                        {...register(type, validation(type) )}
                        onKeyUp={() => {
                            trigger(type)
                        }}
                    />
                    {errorsValidation(errors.type, 'Include any simvols')}
                </Col>
            </Row>
        </div>
    )
}