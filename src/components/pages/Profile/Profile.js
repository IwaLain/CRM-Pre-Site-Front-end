import { Button, Card, Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import { useContext, useEffect, useState } from "react"
import Profile from "../../../js/api/profile"
import UserModal from "../Users/UserModal/UserModal"
import { GlobalContext } from "../../../context"
import convertToBase64 from "../../../js/helpers/convertImage"

const ProfilePage = () => {
    const { userProfile, setUserProfile } = useContext(GlobalContext)
    const [profile, setProfile] = useState(userProfile);
    const [loadedImg, setLoadedImg] = useState(process.env.REACT_APP_SERVER_URL + "/" + profile.img);
    const [img, setImg] = useState(process.env.REACT_APP_SERVER_URL + "/" + profile.img);
    const [modalEditProfile, setModalEditProfile] = useState(false)

    const toggleEditProfile = () => setModalEditProfile(!modalEditProfile)
    const editeProfile = (data) => {
        setProfile(data)
    }
    
    const profileData = [
        {title: "First Name", desc: profile.first_name},
        {title: "Last Name", desc: profile.last_name},
        {title: "Phone", desc: profile.phone},
        {title: "Email", desc: profile.email},
        {title: "Role", desc: profile.role},
    ]

    const checkEmpty = (data) => data ? data : '--'

    useEffect(() => {
        Profile.getProfile()
        .then(data => {
            setProfile(data.user)
        })
    }, [])
      
    const addImageHandler = (e) => {
        const file = e.target.files[0];
        let url = URL.createObjectURL(file);
        if (file) {
            convertToBase64(file).then((res) => setImg(res));
            setLoadedImg(url);
        } else {
            setLoadedImg(placeholder);
        }

        Profile.uploadProfilePhoto(profile.id, {'img': img})
        .then(data => console.log(data))
    };

    return(
        <>
            <Row className='profile__container'>
                <Col md="3" className='profile__item'>
                    <Card className="profile__card">
                        <Row className='profile__avatar'>
                            <Label
                                className="image-field"
                                for="image-field">
                                <img
                                    className='profile__img'
                                    src={
                                        loadedImg === null || '' || 'http://crm.local' 
                                        ? placeholder 
                                        : loadedImg
                                    }
                                    alt="Avatar"
                                />
                            </Label>
                            <input
                                className="form-control"
                                id="image-field"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={addImageHandler}
                            />
                        </Row>
                        <Row className="profile__username">
                            User: {profile.username}
                        </Row>
                    </Card>
                </Col>
                <Col md="6" className='profile__item'>
                    <Card className="profile__card">
                        <Row md="12" className='profile'>
                            <Col className="profile__data">
                                {profileData.map(data => (
                                    <Row className='profile__list' key={data.title}>
                                        <Col className='profile__text'>
                                            <Label>{data.title}</Label>
                                            <div className="profile__desc">{checkEmpty(data.desc)}</div>
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                            <Button
                                className='profile__button'
                                onClick={(e) => {
                                    e.preventDefault()
                                    toggleEditProfile(true)
                            }}>
                                Edit Profile
                                <i className="fas fa-user-edit"></i>
                            </Button>
                        </Row>
                    </Card>
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