import { getToken } from '../helpers/helpers'
import { apiRequest } from './api'
import { URL } from './constants'

const Global = {
    loginRequest: ( username, password, callback ) => {
        apiRequest( 'POST', URL + '/api/login', callback, {
            username: username,
            password: password
        }, {
            'Accept': 'application/json'
        })
    },

    logoutRequest: callback => {
        const token = getToken()

        if ( token ) apiRequest( 'POST', URL + '/api/logout/', callback, {}, {
            'Authorization': 'Bearer' + token
        })
    },

    getProfile: callback => {
        const token = getToken()
        if ( token ) apiRequest( 'GET', URL, `/api/user?access-token=${token}`, callback, {}, {
            'Authorization': 'Bearer' + token
        })
    },

    updateProfile: (callback, data, id) => {
        const token = getToken()
        if ( token ) apiRequest( 'GET', URL, `/api/user/update/${id}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    },

    uploadProfilePhoto: (callback, data, id) => {
        const token = getToken()
        if ( token ) apiRequest( 'GET', URL, `/api/user/update/${id}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    }
}

export default Global