import { getToken } from '../helpers/helpers'
import { apiRequest } from './api'
import { BASE_URL } from './constants'

const Global = {
    loginRequest: async ( data ) => {
        return apiRequest( 'POST', BASE_URL + '/api/login', data, {
            'Content-Type': 'application/json'
        })
    },

    logoutRequest: async () => {
        const token = getToken()

        if ( token ) return apiRequest( 'POST', BASE_URL + `/api/logout?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    },

    getProfile: async () => {
        const token = getToken()
        
        if ( token ) return await apiRequest( 'GET', BASE_URL + `/api/user/profile?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    },

    updateProfile: async (id, data) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'PUT', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    lastCustomer: async (id) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'GET', BASE_URL + `/api/user/last-customer/${id}?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    },

    uploadProfilePhoto: async (id, data) => {
        const token = getToken()
        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Authorization': 'Bearer' + token
        })
    }
}

export default Global