import { useState } from "react"
import { useForm } from "react-hook-form"
import { Col, Label, Row } from "reactstrap"
import edit from '../../../../assets/img/edite.svg'

export const Fields = (label, value) => {
    const {
        register,
    } = useForm({
        defaultValues: {
            label: value
        }
    });

    return (
        <Row className='profile__item mt-4'>
            <Col md={2} lg={1}>
                <Label className='profile__label'>{label}</Label>
            </Col>
            <Col lg={2} md={2}>
                <div className='profile__text'>
                    <input
                        className='profile__blur form-control'
                        {...register(label)}
                    />
                    <img
                        className='profile__edit'
                        src={edit}
                        alt="edit"
                    />
                </div>
            </Col>
        </Row>
    )
}