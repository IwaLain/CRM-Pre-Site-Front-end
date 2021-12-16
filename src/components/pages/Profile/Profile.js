import { Button, Card, Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import { useContext, useEffect, useState } from "react"
import Profile from "../../../js/api/profile"
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
        Profile.getProfile()
        .then(data => {
            setProfile(data.user)
            setLoadedImg(
                process.env.REACT_APP_SERVER_URL + "/" + profile.img
            );
        })
    }, [userProfile])

    const setNewImage = (img) => {
        let data = {
            'img': img
        }
        Profile.updateProfile(profile.id, data)
    }

    const addImageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file).then((res) => setImg(res));
            const url = URL.createObjectURL(file);
            setLoadedImg(url);
            setNewImage(img)
        }
    };

    const checkEmpty = (data) => data ? data : '--'

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
                                    src={profile.img === null ? placeholder : loadedImg}
                                    alt="Avatar"
                                />
                            </Label>
                            <input
                                className="form-control"
                                id="image-field"
                                type="file"
                                accept="image/*"
                                onChange={addImageHandler}
                            />
                        </Row>
                        <Row className="profile__username">
                            User: {profile.username}
                        </Row>
                    </Card>
                </Col>
                <Col md="8" className='profile__item'>
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