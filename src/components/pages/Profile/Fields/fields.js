import { useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Label, Row } from "reactstrap"
import edit from '../../../../assets/img/edite.svg'

export const Fields = (label, value) => {
    const [toggle, setToggle] = useState(true)

    const toggleField = () => setToggle(!toggle)

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            label: value
        }
    });

    return (
        <Row className='profile__item mt-3'>
            <Col md={3} lg={2}>
                <Label className='profile__label'>{label}</Label>
            </Col>
            <Col lg={4} md={4}>
                <div className='profile__text'>
                    <input
                        className='profile__blur form-control'
                        disabled={toggle}
                        {...register('label')}
                    />
                    <img
                        className='profile__edit'
                        src={edit}
                        alt="edit"
                        onClick={toggleField}
                    />
                </div>
            </Col>
        </Row>
    )
}