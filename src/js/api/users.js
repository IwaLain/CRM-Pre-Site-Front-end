import { getToken } from '../helpers/helpers'
import { apiRequest } from "./api"
import { BASE_URL } from './constants'

const User = {
    getUsers: () => {
        const token = getToken()

        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user?access-token=${token}`, {}, {})
    },

    editUserRole: (id, data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/role/assign-role/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    addUser: (data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/user/create?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    editeUser: (id, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    deleteUser: (id) => {
        const token = getToken()

        if ( token ) return apiRequest('DELETE', BASE_URL + `/api/user/delete/${id}?access-token=${token}`, {}, {})
    }
}

export default User
