import React from 'react'
import Global from '../../../../js/api/global';
import UserModal from '../../Users/UserModal/UserModal';

const ProfileEdit = ({currentUser, method, toggle, modal}) => {

    const onSubmit = (e) => {
        const data = {
            'id': currentUser.id,
            'first_name': e.firstname,
            'last_name': e.lastname,
            'username': e.username,
            'email': e.email,
            'phone': e.phone,
            'role': e.role,
        }

        Global.updateProfile(currentUser.id, data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                alert('success', 'Edit Profile successful')
            }
        })

        Global.updateProfile(currentUser.id, data)

        method.editeProfile(currentUser.id, data)
    };

    console.log(currentUser)

    return (
        <div>
            <UserModal 
                type='Edit Profile'
                toggle={toggle}
                modal={modal}
                method={onSubmit}
                data={currentUser}
            />
        </div>
    )
}

export default ProfileEdit
