import React, {useReducer} from 'react';
import { 
    Button, 
    Col, 
    Label, 
    Row 
} from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import { useContext, useEffect } from "react"
import Profile from "../../../js/api/profile"
import UserModal from "../Users/modal"
import { GlobalContext } from "../../../context"
import convertToBase64 from "../../../js/helpers/convertImage"
import { reducer } from '../../../reducer';

const ProfilePage = () => {
    const { userProfile, setUserProfile} = useContext(GlobalContext)

    const initialState = {
        profile: userProfile,
        loadedImg: process.env.REACT_APP_SERVER_URL + "/" + userProfile.img,
        img: process.env.REACT_APP_SERVER_URL + "/" + userProfile.img,
        modalEditProfile: false,
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const {profile, loadedImg, img, modalEditProfile} = state

    const profileData = [
        {title: "Avatar", desc: profile.img},
        {title: "Username", desc: profile.username},
        {title: "First Name", desc: profile.first_name},
        {title: "Last Name", desc: profile.last_name},
        {title: "Phone", desc: profile.phone},
        {title: "Email", desc: profile.email},
        {title: "Role", desc: profile.role},
    ]
    
    const toggleEditProfile = () => dispatch({modalEditProfile: !modalEditProfile})

    const editeProfile = (data) => {
        setUserProfile(data)
    }
    
    const checkEmpty = (data) => data ? data : '--'

    useEffect(() => {
        Profile.getProfile()
        .then(data => {
            dispatch({profile: data.user})
        })
    }, [userProfile])
      
    const addImageHandler = (e) => {
        const file = e.target.files[0];
        let url = URL.createObjectURL(file);
        if (file) {
            convertToBase64(file).then((res) => dispatch({type: 'IMG', payload: res}));
            dispatch({loadedImg: loadedImg});
        } else {
            dispatch({loadedImg: loadedImg});
        }

        Profile.uploadProfilePhoto(profile.id, {'img': img})
        .then(data => console.log(data))
    };

    return(
        <div className="container-fluid profile__container">
            <Row>
                <h3>Profile</h3>
            </Row>
            <Row className='profile__item'>
                <Row md="12" className='profile'>
                    <Col className="profile__data">
                        <table>
                            <tbody>
                                {
                                    profileData.map(data => (
                                        data.title === 'Avatar' 
                                        ?
                                        <tr className='profile__list' key={data.title}>
                                            <td className="profile__title">
                                                <Label>{data.title}</Label>
                                            </td>
                                            <td className='profile__avatar'>
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
                                            </td>
                                        </tr>
                                        :
                                        <tr className='profile__list' key={data.title}>
                                            <td className="profile__title">
                                                <Label>{data.title}</Label>
                                            </td>
                                            <td className="profile__desc">
                                                <div className="profile__desc">{checkEmpty(data.desc)}</div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr className='profile__list' key="profile__button">
                                    <td className="profile__title"><Label></Label></td>
                                    <td className="profile__desc">
                                        <Row>
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Row>
            <UserModal
                type='Edit Profile'
                currentUser={profile}
                method={editeProfile}
                toggle={toggleEditProfile}
                modal={modalEditProfile}
            />
        </div>
    )
}

export default ProfilePage