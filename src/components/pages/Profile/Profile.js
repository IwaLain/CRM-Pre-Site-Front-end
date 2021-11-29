import { Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import edit from '../../../assets/img/edite.svg'
import { useEffect, useState } from "react"
import Global from "../../../js/api/global"
import convertToBase64 from "../../../js/methods/convertImage"
import { getToken } from "../../../js/helpers/helpers"
const ProfilePage = () => {
    const [loadedImg, setLoadedImg] = useState();
    const [img, setImg] = useState();
    const [profile, setProfile] = useState();

    useEffect(() => {
        const token = getToken()
        Global.getProfile(token)
        .then(data => {
            setProfile(data.user)
        })
    }, [])

    let {email} = profile

    console.log(email)

    for(let key in profile) {
        console.log(profile[key])
    }

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
                        <Col lg={4} className='d-flex justify-content-center profile__avatar'>
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
                        <Col className='profile__text' lg={4} md={3}>

                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>First Name</Label>
                        </Col>
                        <Col className='profile__text' lg={4} md={3}>
                            {/* {profile.first_name} */}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Last Name</Label>
                        </Col>
                        <Col className='profile__text' lg={4} md={3}>
                            {/* {profile.last_name} */}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Email</Label>
                        </Col>
                        <Col className='profile__text' lg={4} md={3}>
                            {/* {profile.email} */}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Phone</Label>
                        </Col>
                        <Col className='profile__text' lg={4} md={3}>
                            {/* {profile.phone} */}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Role</Label>
                        </Col>
                        <Col className='profile__text' lg={4} md={3}>
                            {/* {profile.role} */}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ProfilePage