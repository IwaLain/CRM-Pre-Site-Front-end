import React, { useReducer, useContext, useEffect } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'

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
    loadedImg: process.env.REACT_APP_SERVER_URL + '/' + userProfile.img,
    modalEditProfile: false,
    img: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { profile, loadedImg, modalEditProfile, img } = state

  const profileData = [
    { title: 'Avatar', desc: profile.img },
    { title: 'Username', desc: profile.username },
    { title: 'First Name', desc: profile.first_name },
    { title: 'Last Name', desc: profile.last_name },
    { title: 'Phone', desc: profile.phone },
    { title: 'Email', desc: profile.email },
    { title: 'Role', desc: profile.role }
  ]

  const toggleEditProfile = () => dispatch({ modalEditProfile: !modalEditProfile })

  const editeProfile = (data) => {
    dispatch({ profile: data })
  }

  const checkEmpty = (data) => (data ? data : '--')

  useEffect(() => {
    Profile.getProfile().then((data) => {
      dispatch({ profile: data.user })
    })
  }, [])

  const setNewImage = (img) => {
    let data = {
      img: img
    }

    setUserProfile({ ...userProfile, img: loadedImg })
    Profile.updateProfile(profile.id, data)
  }

  const addImageHandler = (e) => {
    const file = e.target.files[0]

    if (file) {
      convertToBase64(file).then((res) => dispatch({ img: res }))
      const url = URL.createObjectURL(file)
      dispatch({ loadedImg: url })
      setNewImage(img)
    }
  }

  return (
    <div className="container-fluid profile__container">
      <Row>
        <h3>Profile</h3>
      </Row>
      <Row className="profile__item">
        <Row md="12" className="profile">
          <Col className="profile__data">
            <table>
              <tbody>
                {profileData.map((data) =>
                  data.title === 'Avatar' ? (
                    <tr className="profile__list" key={data.title}>
                      <td className="profile__title">
                        <Label>{data.title}</Label>
                      </td>
                      <td className="profile__avatar">
                        <Label className="image-field" for="image-field">
                          <img
                            className="profile__img"
                            src={loadedImg !== '' || null ? loadedImg : placeholder}
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
                  ) : (
                    <tr className="profile__list" key={data.title}>
                      <td className="profile__title">
                        <Label>{data.title}</Label>
                      </td>
                      <td className="profile__desc">
                        <div className="profile__desc">{checkEmpty(data.desc)}</div>
                      </td>
                    </tr>
                  )
                )}
                <tr className="profile__list" key="profile__button">
                  <td className="profile__title">
                    <Label></Label>
                  </td>
                  <td className="profile__desc">
                    <Row>
                      <Button
                        className="ui-btn ui-btn-primary"
                        onClick={toggleEditProfile}
                      >
                        <i className="fas fa-user-edit"></i>
                        Edit Profile
                      </Button>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
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
