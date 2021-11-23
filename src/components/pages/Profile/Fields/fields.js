import { Col, Label, Row } from "reactstrap"
import edit from '../../../../assets/img/edite.svg'

export const fields = (label, value) => {
    return (
        <Row className='profile__item mt-3'>
            <Col lg={1}>
                <Label className='profile__label'>{label}</Label>
            </Col>
            <Col lg={3} md={4}>
                <p className='profile__text form-control'>
                    {value}
                    <img className='profile__edit' src={edit} alt="edit" />
                </p>
            </Col>
        </Row>
    )
}