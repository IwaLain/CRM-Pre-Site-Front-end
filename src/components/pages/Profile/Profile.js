import { Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import { fields } from "./Fields/fields"
const ProfilePage = () => {
    return(
        <>
            <h3>Profile</h3>
            <Row>
                <Col lg={12} className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col  lg={1}>
                            <Label className='profile__label'>Avatar</Label>
                        </Col>
                        <Col lg={3} md={4} className='d-flex justify-content-center'>
                            <img className='profile__img' src={placeholder} alt="Avatar" />
                        </Col>
                    </Row>
                    {fields('Username', 'Alakey123')}
                    {fields('First Name', 'Alex')}
                    {fields('Last Name', 'Shatailov')}
                    {fields('Email Ardess', 'samoran232@gmail.com')}
                    {/* <Row className='profile__item'>
                        <Col lg={2}>
                            <Label className='profile__label'>First Name</Label>
                        </Col>
                        <Col lg={3} md={4}>
                            <p className='profile__text form-control'>Alex</p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2}>
                            <Label className='profile__label'>Last Name</Label>
                        </Col>
                        <Col lg={3} md={4}>
                            <p className='profile__text form-control'>Shatailov</p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2}>
                            <Label className='profile__label'>Email Adress</Label>
                        </Col>
                        <Col lg={3} md={4}>
                            <p className='profile__text form-control'>samoran232@gmail.com</p>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </>
    )
}

export default ProfilePage