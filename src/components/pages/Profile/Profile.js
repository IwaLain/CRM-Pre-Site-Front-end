import { Button, Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import { useContext, useEffect, useState } from "react"
import Global from "../../../js/api/global"
import convertToBase64 from "../../../js/helpers/convertImage"
import UserModal from "../Users/UserModal/UserModal"
import { GlobalContext } from "../../../context"
const ProfilePage = () => {
    const [loadedImg, setLoadedImg] = useState('');
    const [img, setImg] = useState('');
    const [modalEditProfile, setModalEditProfile] = useState(false)
    const { userProfile, setUserProfile } = useContext(GlobalContext)
    const [profile, setProfile] = useState(userProfile);
    useEffect(() => {
        Global.getProfile()
        .then(data => {
            setProfile(data.user)
        })
    }, [userProfile])

    const toggleEditProfile = () => setModalEditProfile(!modalEditProfile)

    const editeProfile = (data) => {
        setUserProfile(data)
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
            <Row className='profile'>
                <Col className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col lg={{offset: 2, size: 3}} className='d-flex justify-content-center profile__avatar'>
                            <div className='profile__avatar'>
                                <Label className="image-field" for="image-field">
                                    <img className='profile__img' src={placeholder} alt="Avatar" />
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
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.username}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>First Name</Label>
                        </Col>
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.first_name}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Last Name</Label>
                        </Col>
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.last_name}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Email</Label>
                        </Col>
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.email}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Phone</Label>
                        </Col>
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.phone}
                        </Col>
                    </Row>
                    <Row className='profile__item'>
                        <Col lg={2} md={2}>
                            <Label className='profile__label'>Role</Label>
                        </Col>
                        <Col className='profile__text' lg={3} md={3}>
                            {profile.role}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='profile__button' lg={{offset: 2, size: 3}}>
                            <Button
                                className=''
                                onClick={(e) => {
                                    e.preventDefault()
                                    toggleEditProfile(true)
                                }}
                            >Edite Profile</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <UserModal
                type='Edit Profile'
                currentUser={profile}
                method={editeProfile}
                toggle={toggleEditProfile}
                modal={modalEditProfile}
            />
        </>
    )
}

export default ProfilePage