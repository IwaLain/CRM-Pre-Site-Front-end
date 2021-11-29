import { getToken } from '../methods/helpers'
import { apiRequest } from './api'
import { URL } from './constants'

const Global = {
    loginRequest: ( username, password, callback ) => {
        return apiRequest( 'POST', URL + '/api/login', callback, {
            username: username,
            password: password
        }, {
            'Accept': 'application/json'
        })
    },

    logoutRequest: callback => {
        const token = getToken()

        if ( token ) return apiRequest( 'POST', URL + '/api/logout/', callback, {}, {
            'Authorization': 'Bearer' + token
        })
    },

    getProfile: callback => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', URL, `/api/user?access-token=${token}`, callback, {}, {
            'Authorization': 'Bearer' + token
        })
    },

    updateProfile: (callback, data, id) => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', URL, `/api/user/update/${id}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    },

    uploadProfilePhoto: (callback, data, id) => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', URL, `/api/user/update/${id}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    }
}

export default Global