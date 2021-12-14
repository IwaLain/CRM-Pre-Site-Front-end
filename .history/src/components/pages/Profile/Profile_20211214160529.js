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

    const checkEmpty = (data) => data ? data : '--'

    const toggleEditProfile = () => setModalEditProfile(!modalEditProfile)
    const editeProfile = (data) => {
        setProfile(data)
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

    return(
        <>
            <h3>Profile</h3>
            <Row className='profile__container'>
                <Card className="profile__card">
                    <Row className="profile__username">
                        {profile.username}
                    </Row>
                    <Row md="12" className='profile'>
                        <Col md="4" className='profile__item'>
                            <Row className='profile__avatar'>
                                <Label
                                    className="image-field"
                                    for="image-field">
                                    <img
                                        className='profile__img'
                                        src={
                                            profile.img === null ? placeholder : loadedImg
                                        }
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
                            {/* <Row className="profile__username">
                                {profile.username}
                            </Row> */}
                            <Row className='profile__button'>
                                <Button
                                    className=''
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleEditProfile(true)
                                }}>
                                    Edite Profile
                                    <i className="fas fa-user-edit"></i>
                                </Button>
                            </Row>
                        </Col>
                        <Col md="8" className="profile__data">
                            <Row className='profile__item'>
                                <Label className='profile__label'>Username</Label>
                                <Col className='profile__text'>
                                    {checkEmpty(profile.username)}
                                </Col>
                            </Row>
                            <Row className='profile__item'>
                                
                                    <Label className='profile__label'>First Name</Label>
                                
                                <Col className='profile__text'>
                                    {checkEmpty(profile.first_name)}
                                </Col>
                            </Row>
                            <Row className='profile__item'>
                                
                                    <Label className='profile__label'>Last Name</Label>
                                
                                <Col className='profile__text'>
                                    {checkEmpty(profile.last_name)}
                                </Col>
                            </Row>
                            <Row className='profile__item'>
                                
                                    <Label className='profile__label'>Email</Label>
                                
                                <Col className='profile__text'>
                                    {checkEmpty(profile.email)}
                                </Col>
                            </Row>
                            <Row className='profile__item'>
                            
                                    <Label className='profile__label'>Phone</Label>
                                
                                <Col className='profile__text'>
                                    {checkEmpty(profile.phone)}
                                </Col>
                            </Row>
                            <Row className='profile__item'>
                                
                                    <Label className='profile__label'>Role</Label>
                            
                                <Col className='profile__text'>
                                    {checkEmpty(profile.role)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
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