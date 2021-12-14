import { getToken } from '../helpers/helpers'
import { apiRequest } from "./api"

const BASE_URL = process.env.REACT_APP_SERVER_URL

const User = {
    get: () => {
        const token = getToken()

        if ( token ) return apiRequest( 'GET', BASE_URL + `/api/user?access-token=${token}`, {}, {})
    },

    editRole: (id, data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/role/assign-role/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    create: (data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/user/create?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    edite: (id, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    delete: (id) => {
        const token = getToken()

        if ( token ) return apiRequest('DELETE', BASE_URL + `/api/user/delete/${id}?access-token=${token}`, {}, {})
    }
}

export default User
