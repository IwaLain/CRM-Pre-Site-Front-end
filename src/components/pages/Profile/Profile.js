import { Col, Label, Row } from "reactstrap"
import './Profile.scss'
import placeholder from '../../../assets/img/profile_placeholder.png'
import edit from '../../../assets/img/edite.svg'
import { Fields } from "./Fields/fields"
import { useEffect, useState } from "react"
import { profile } from "../../../js/api/profile"
const ProfilePage = () => {
    const [profileData, setProfileData] = useState([])
    useEffect(() => {
        profile.getProfile()
        .then(data => 
            setProfileData(data)
        )
    }, [])

    console.log(profileData)

    return(
        <>
            <h3>Profile</h3>
            <Row>
                <Col lg={12} className='p-5 pt-4'>
                    <Row className='profile__item'>
                        <Col md={2} lg={1}>
                            <Label className='profile__label'>Avatar</Label>
                        </Col>
                        <Col lg={2} md={2} className='d-flex justify-content-center'>
                            <div className='profile__avatar'>
                                <img className='profile__img' src={placeholder} alt="Avatar" />
                                <div className='profile__img-edit justify-content-sm-center align-items-center'>
                                    <img
                                        src={edit}
                                        alt="edit"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {
                        profileData
                    }
                </Col>
            </Row>
        </>
    )
}

export default ProfilePage