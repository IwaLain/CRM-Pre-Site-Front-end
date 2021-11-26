import { getToken } from '../helpers/helpers'
import { apiRequest } from './api'
import { BASE_URL } from './constants'

const Global = {
    loginRequest: ( username, password ) => {
        return apiRequest( 'POST', BASE_URL + '/api/login', {
            username: username,
            password: password
        }, {
            'Accept': 'application/json'
        })
    },

    logoutRequest: () => {
        const token = getToken()

        if ( token ) return apiRequest( 'POST', BASE_URL + '/api/logout/', {}, {
            'Content-Type':'application/json'
        })
    },

    getProfile: () => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    },

    updateProfile: (data, id) => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    uploadProfilePhoto: (data, id) => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Authorization': 'Bearer' + token
        })
    }
}

export default Global