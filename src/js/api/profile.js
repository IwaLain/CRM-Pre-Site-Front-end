import { getToken } from '../helpers/helpers'
import { apiRequest, header, BASE_URL} from './api'

const Profile = {
    loginRequest: async ( data ) => {
        return apiRequest( 'POST', BASE_URL + '/api/login', data, header)
    },

    logoutRequest: async () => {
        const token = getToken()

        if ( token ) return apiRequest( 'POST', BASE_URL + `/api/logout?access-token=${token}`, {}, header)
    },

    getProfile: async () => {
        const token = getToken()

        if ( token ) return await apiRequest( 'GET', BASE_URL + `/api/user/profile?access-token=${token}`, {}, header)
    },

    updateProfile: async (id, data) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'PUT', BASE_URL + `/api/user/update/${id}?access-token=${token}`, data, header)
    },

    lastCustomer: async (id) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'GET', BASE_URL + `/api/user/last-customer/${id}?access-token=${token}`, {}, header)
    },

    setlastCustomer: async (id) => {
        const token = getToken()
        if ( token ) return await apiRequest( 'PUT', BASE_URL + `/api/user/last-customer/${id}?access-token=${token}`, {}, header)
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