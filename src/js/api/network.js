import { getToken } from "../helpers/helpers"
import { apiRequest } from "./api"
import { BASE_URL } from "./constants"


const networkApi = {
    create: {
        gataway: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/gateway/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        node: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/node/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        mote: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/mote/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        router: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/router/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        sensor: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/sensor/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        }
    },

    update: {
        gataway: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/gateway/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        node: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/node/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        mote: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/mote/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        router: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/router/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        sensor: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/sensor/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        }
    },

    get: {
        allGataways: async () => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/gateway/list?access-token=${token}`, {}, {})
        },
    
        allNodes: async () => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/node/list?access-token=${token}`, {}, {})
        },
    
        allMotes: async () => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/mote/list?access-token=${token}`, {}, {})
        },
    
        allRouters: async () => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/routers/list?access-token=${token}`, {}, {})
        },
    
        allSensors: async () => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/sensors/list?access-token=${token}`, {}, {})
        },

        gataway: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/gateway/${id}?access-token=${token}`, {}, {})
        },
    
        node: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/node/${id}?access-token=${token}`, {}, {})
        },
    
        mote: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/mote/${id}?access-token=${token}`, {}, {})
        },
    
        router: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/router/${id}?access-token=${token}`, {}, {})
        },
    
        sensor: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/sensor/${id}?access-token=${token}`, {}, {})
        },

        gatawayByCustomer: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/customer/${id}/gateway?access-token=${token}`, {}, {})
        }
    },

    delete: {
        gataway: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/gateway/delete/${id}?access-token=${token}`, {}, {})
        },
    
        node: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/delete/delete/${id}?access-token=${token}`, {}, {})
        },
    
        mote: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/mote/delete/${id}?access-token=${token}`, {}, {})
        },
    
        router: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/router/delete/${id}?access-token=${token}`, {}, {})
        },
    
        sensor: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/sensor/delete/${id}?access-token=${token}`, {}, {})
        }
    }
}

export default networkApi