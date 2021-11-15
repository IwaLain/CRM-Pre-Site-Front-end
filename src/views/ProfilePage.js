import { Col, Label, Row } from "reactstrap"
import '../scss/components/profile-page.scss'
import placeholder from '../assets/img/company.png'
const ProfilePage = () => {
    return(
        <>
            <h3>Profile</h3>
            <Row>
                <Col lg={12} className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col  lg={2}>
                            <Label className='profile__label'>Avatar</Label>
                        </Col>
                        <Col lg={3} md={4} className='d-flex justify-content-center'>
                            <img className='profile__img' src={placeholder} alt="Avatar" />
                        </Col>
                    </Row>
                    <Row className='profile__item mt-3'>
                        <Col lg={2}>
                            <Label className='profile__label'>Username</Label>
                        </Col>
                        <Col lg={3} md={4}>
                            <p className='profile__text form-control'>
                                Alakey123
                            </p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
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
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ProfilePage