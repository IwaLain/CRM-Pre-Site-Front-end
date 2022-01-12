import React, { useReducer, useContext, useEffect } from 'react'
import { Col, Label, Row } from 'reactstrap'

import convertToBase64 from '../../js/helpers/convertImage'
import { GlobalContext } from '../../context'
import { reducer } from '../../reducer'

import Profile from '../../js/api/profile'
import UserModal from '../Users/modal'

import './Profile.scss'

import placeholder from '../../assets/img/profile_placeholder.png'

const ProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(GlobalContext)

  const initialState = {
    profile: userProfile,
    loadedImg: userProfile.img,
    modalEditProfile: false,
    img: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { profile, loadedImg, modalEditProfile, img } = state

  const profileData = [
    { title: 'First Name', desc: profile.first_name },
    { title: 'Last Name', desc: profile.last_name },
    { title: 'Phone', desc: profile.phone },
    { title: 'Email', desc: profile.email },
    { title: 'Role', desc: profile.role }
  ]

  const toggleEditProfile = () => dispatch({ modalEditProfile: !modalEditProfile })
  const editeProfile = (data) => dispatch({ profile: data })
  const checkEmpty = (data) => (data ? data : '--')
  const checkImgProfile = (newLoadedImg) => {
    if (newLoadedImg === null || '') {
      return placeholder
    } else {
      if(newLoadedImg.includes('blob:'))
        return newLoadedImg
      else 
        return process.env.REACT_APP_SERVER_URL + '/' + newLoadedImg
    }
  }

  useEffect(() => {
    Profile.getProfile().then((data) => {
      dispatch({ profile: data.user })
    })
  }, [])

  const setNewImage = (newImage) => {
    let data = {
      img: newImage
    }

    Profile.updateProfile(profile.id, data)
    .then(data => {
      setUserProfile({ ...userProfile, img: loadedImg })
    })
  }

  const addImageHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      convertToBase64(file).then(res => dispatch({ img: res }))
      const url = URL.createObjectURL(file)
      dispatch({ loadedImg: url })
      setNewImage(img)
    }

    console.log(img)

    e.target.value = ""
  }

  return (
    <div className="profile">
      <Row>
        <h3>Profile</h3>
      </Row>
      <Row>
        <div className='profile__title'>
          <div className='profile__avatar'>
              <Label className="image-field" for="image-field">
                <img
                  className="profile__img"
                  src={checkImgProfile(loadedImg)}
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
          </div>
          <div className='profile__username'>
            {profile.username}
          </div>
        </div>
        <ul className='profile__list'>
          {
            profileData.map((data) =>
              <li className='profile__item' key={data.title}>
                <Col>
                  {data.title}
                </Col>
                <Col>
                  <div className="profile__desc">{checkEmpty(data.desc)}</div>
                </Col>
              </li>           
            )
          }
        </ul>
        <div className='profile__btn' key='profile__btn'>
          <button
              className="ui-btn ui-btn-primary"
              onClick={toggleEditProfile}
            >
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </button>
        </div>
      </Row>
      {modalEditProfile ? (
        <UserModal
          type="Edit Profile"
          currentUser={profile}
          method={editeProfile}
          toggle={toggleEditProfile}
          modal={modalEditProfile}
        />
      ) : null}
    </div>
  )
}

export default ProfilePage
