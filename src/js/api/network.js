import { getToken } from "../helpers/helpers"
import { apiRequest } from "./api"
import { BASE_URL } from "./constants"


const networkApi = {
    create: {
        gataways: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/gateway/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        nodes: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/node/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        motes: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/mote/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        routers: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/router/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        sensors: async (data) => {
            const token = getToken()

            if ( token ) return apiRequest('POST', BASE_URL + `/api/sensor/create?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        }
    },

    update: {
        gataways: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/gateway/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        nodes: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/node/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        motes: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/mote/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        routers: async (id, data) => {
            const token = getToken()

            if ( token ) return apiRequest('PUT', BASE_URL + `/api/router/update/${id}?access-token=${token}`, data, {
                'Content-Type':'application/json'
            })
        },
    
        sensors: async (id, data) => {
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

        gataways: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/gateway/${id}?access-token=${token}`, {}, {})
        },
    
        nodes: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/node/${id}?access-token=${token}`, {}, {})
        },
    
        motes: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/mote/${id}?access-token=${token}`, {}, {})
        },
    
        routers: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/router/${id}?access-token=${token}`, {}, {})
        },
    
        sensors: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('GET', BASE_URL + `/api/sensor/${id}?access-token=${token}`, {}, {})
        }
    },

    delete: {
        gataways: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/gateway/delete/${id}?access-token=${token}`, {}, {})
        },
    
        nodes: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/delete/delete/${id}?access-token=${token}`, {}, {})
        },
    
        motes: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/mote/delete/${id}?access-token=${token}`, {}, {})
        },
    
        routers: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/router/delete/${id}?access-token=${token}`, {}, {})
        },
    
        sensors: async (id) => {
            const token = getToken()

            if ( token ) return apiRequest('DELETE', BASE_URL + `/api/sensor/delete/${id}?access-token=${token}`, {}, {})
        }
    }
}

export default networkApi