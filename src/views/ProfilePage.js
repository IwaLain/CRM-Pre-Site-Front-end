import { Col, Container, Label, Row } from "reactstrap"
import '../scss/components/profile-page.scss'
const ProfilePage = () => {
    return(
        <Container>
            <h3>Profile</h3>
            <Row>
                <Col lg={12} className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col className='align-self-center' sm={6} lg={3}>
                            <Label className='profile__label'>Avatar</Label>
                        </Col>
                        <Col sm={6} lg={4} className='d-flex justify-content-center'>
                            <img className='profile__img' src="" alt="Avatar" />
                        </Col>
                    </Row>
                    <Row className='profile__item mt-3'>
                        <Col lg={3}>
                            <Label className='profile__label'>Username</Label>
                        </Col>
                        <Col lg={4}>
                            <p className='profile__text'>Alakey123</p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={3}>
                            <Label className='profile__label'>First Name</Label>
                        </Col>
                        <Col lg={4}>
                            <p className='profile__text'>Alex</p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={3}>
                            <Label className='profile__label'>Last Name</Label>
                        </Col>
                        <Col lg={4}>
                            <p className='profile__text'>Shatailov</p>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={3}>
                            <Label className='profile__label'>Email Adress</Label>
                        </Col>
                        <Col lg={4}>
                            <p className='profile__text'>samoran232@gmail.com</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage