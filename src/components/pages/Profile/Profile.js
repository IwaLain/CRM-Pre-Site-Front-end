import { Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import edit from '../../../assets/img/edite.svg'
import { useEffect, useState } from "react"
import Global from "../../../js/api/global"
import convertToBase64 from "../../../js/helpers/convertImage"
const ProfilePage = () => {
    const [loadedImg, setLoadedImg] = useState();
    const [img, setImg] = useState();
    const [profile, setProfile] = useState({
        id: '',
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: '',
        img: placeholder
    });

    useEffect(() => {
        Global.getProfile()
        .then(data => {
            setProfile(data.user)
        })
    }, [])

    const addImageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file).then((res) => setImg(res));
            const url = URL.createObjectURL(file);
            setLoadedImg(url);
        }
    };
    return(
        <>
            <h3>Profile</h3>
            <Row>
                <Col lg={12} className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col lg={5} className='d-flex justify-content-center profile__avatar'>
                            <div className='profile__avatar'>
                                <Label className="image-field" for="image-field">
                                    <img className='profile__img' src={loadedImg} alt="Avatar" />
                                </Label>
                                <input
                                    className="form-control"
                                    id="image-field"
                                    type="file"
                                    accept="image/*"
                                    onChange={addImageHandler}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Username</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.username} 
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>First Name</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.first_name}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Last Name</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.last_name}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Email</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.email}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Phone</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.phone}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Role</Label>
                        </Col>
                        <Col className='profile__text' lg={2} md={4}>
                            {profile.role}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ProfilePage