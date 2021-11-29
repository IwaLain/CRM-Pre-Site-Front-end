import { getToken } from '../helpers/helpers'
import { apiRequest } from "./api"
import { BASE_URL } from './constants'

const User = {
    getUsers: () => {
        const token = getToken()

        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user?access-token=${token}`, {}, {})
    },

    editUserRole: (userId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/role/assign-role/${userId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    addUser: (data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/user/create?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    editeUser: (userId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', BASE_URL + `/api/user/update/${userId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    deleteUser: (userId) => {
        const token = getToken()

        if ( token ) return apiRequest('DELETE', BASE_URL + `/api/user/delete/${userId}?access-token=${token}`, {}, {})
    }
}

export default User
