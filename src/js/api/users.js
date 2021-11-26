import { getToken } from '../helpers/helpers'
import { apiRequest } from "./api"
import { URL } from './constants'

const User = {
    getUsers: callback => {
        const token = getToken

        if ( token ) apiRequest( 'GET', URL, `/api/user?access-token=${token}}`, callback, {}, {
            'Authorization': 'Bearer' + token
        })
    },

    editUserRole: (userId, data, callback) => {
        const token = getToken()

        if ( token ) apiRequest('POST', URL + `/api/role/assign-role/${userId}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    },

    addUser: (data, callback) => {
        const token = getToken()

        if ( token ) apiRequest('POST', URL + `/api/user/create?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        })
    },

    editeUser: (userId, data, callback) => {
        const token = getToken()

        if ( token ) apiRequest('PUT', URL + `/api/user/update/${userId}?access-token=${token}`, callback, data, {
            'Authorization': 'Bearer' + token
        }) 
    },

    deleteUser: (userId, callback) => {
        const token = getToken()

        if ( token ) apiRequest('DELETE', URL + `/api/user/delete/${userId}?access-token=${token}`, callback, {}, {
            'Authorization': 'Bearer' + token
        })
    }
}

export default User