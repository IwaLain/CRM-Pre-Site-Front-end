import { getToken } from "../helpers/helpers"
import { apiRequest } from "./api"
import { BASE_URL } from "./constants"


const networkApi = {
    gataway: {
        create: async (data) => {
            const token = getToken()

            if ( token ) return await apiRequest('POST', BASE_URL + `/api/gateway/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        update: async (id, data) => {
            const token = getToken()

            if ( token ) return await apiRequest('PUT', BASE_URL + `/api/gateway/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        get: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/gateway/${id}?access-token=${token}`, {}, {})
        },

        getAll: async () => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/gateway/list?access-token=${token}`, {}, {})
        },

        getByCustomer: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/customer/${id}/gateway?access-token=${token}`, {}, {})
        },

        delete: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('DELETE', BASE_URL + `/api/gateway/delete/${id}?access-token=${token}`, {}, {})
        },
    },

    node: {
        create: async (data) => {
            const token = getToken()

            if ( token ) return await apiRequest('POST', BASE_URL + `/api/node/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
        
        update: async (id, data) => {
            const token = getToken()

            if ( token ) return await apiRequest('PUT', BASE_URL + `/api/node/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        get: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/node/${id}?access-token=${token}`, {}, {})
        },

        getAll: async () => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/node/list?access-token=${token}`, {}, {})
        },

        delete: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('DELETE', BASE_URL + `/api/delete/delete/${id}?access-token=${token}`, {}, {})
        },
    },

    mote: {
        create: async (data) => {
            const token = getToken()

            if ( token ) return await apiRequest('POST', BASE_URL + `/api/mote/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        update: async (id, data) => {
            const token = getToken()

            if ( token ) return await apiRequest('PUT', BASE_URL + `/api/mote/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        get: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/mote/${id}?access-token=${token}`, {}, {})
        },

        getAll: async () => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/mote/list?access-token=${token}`, {}, {})
        },

        delete: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('DELETE', BASE_URL + `/api/mote/delete/${id}?access-token=${token}`, {}, {})
        },
    },

    router: {
        create: async (data) => {
            const token = getToken()

            if ( token ) return await apiRequest('POST', BASE_URL + `/api/router/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        update: async (id, data) => {
            const token = getToken()

            if ( token ) return await apiRequest('PUT', BASE_URL + `/api/router/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        get: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/router/${id}?access-token=${token}`, {}, {})
        },

        getAll: async () => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/routers/list?access-token=${token}`, {}, {})
        },

        delete: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('DELETE', BASE_URL + `/api/router/delete/${id}?access-token=${token}`, {}, {})
        },
    },

    sensor: {
        create: async (data) => {
            const token = getToken()

            if ( token ) return await apiRequest('POST', BASE_URL + `/api/sensor/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        update: async (id, data) => {
            const token = getToken()

            if ( token ) return await apiRequest('PUT', BASE_URL + `/api/sensor/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },

        get: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/sensor/${id}?access-token=${token}`, {}, {})
        },

        getAll: async () => {
            const token = getToken()

            if ( token ) return await apiRequest('GET', BASE_URL + `/api/sensors/list?access-token=${token}`, {}, {})
        },

        delete: async (id) => {
            const token = getToken()

            if ( token ) return await apiRequest('DELETE', BASE_URL + `/api/sensor/delete/${id}?access-token=${token}`, {}, {})
        }
    },
}

export default networkApi