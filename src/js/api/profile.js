import { getToken } from '../helpers/helpers'
import { apiRequest } from './api'

const BASE_URL = process.env.REACT_APP_SERVER_URL

const Profile = {
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

    setlastCustomer: async (id) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'PUT', BASE_URL + `/api/user/last-customer/${id}?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    },

    createPdf: async (data, time) => {
        const token = getToken()
        if (token) {
            fetch(BASE_URL + `/api/commercial-purpose/create-pdf?access-token=${token}`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(data => {
                return data.blob()
            })
            .then(blob => {
                let url = window.URL.createObjectURL(blob)
                let a = document.createElement('a')
                a.href = url
                a.download = `Comertial_Purpose_${time}.pdf`
                document.body.appendChild(a)
                a.click()
                a.remove()
            })
        }
    }
}

export default Profile