import { getToken } from "../helpers/helpers";
import { apiRequest } from "./api";
import { BASE_URL } from "./constants";

const locationApi = {
    getLocations: async (limit, page, search) => {
        const token = getToken()
        let url = `/api/location/list?access-token=${token}`;

        if ( limit  ) url += `&limit=${limit}`;
        if ( page   ) url += `&page=${page}`;
        if ( search ) url += `&s=${search}`;

        if ( token ) return apiRequest('GET', BASE_URL + url, {}, {})
    },

    getLocationTree: async () => {
        const token = getToken()

        if ( token ) return apiRequest('GET', BASE_URL + `/api/location/tree?access-token=${token}`, {}, {})
    },

    addLocation: async (data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', BASE_URL + `/api/location/create?access-token=${token}`, {data}, {
            'Content-Type':'application/json'
        })
    },

    editLocation: async (locationId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', BASE_URL + `/api/location/update/${locationId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    deleteLocatio: async (locationId) => {
        const token = getToken()

        if ( token ) return apiRequest('DELETE', BASE_URL + `/api/location/delete/${locationId}?access-token=${token}`, {}, {})
    },

    getLocation: async (locationId) => {
        const token = getToken()

        if ( token ) return apiRequest('GET', BASE_URL + `/api/location/${locationId}?access-token=${token}`, {}, {})
    },

    getFacilityLocations: async (limit, page, search, facilityId) => {
        const token = getToken()
        let url = `/api/facility/${facilityId}/locations?access-token=${token}`;

        if ( limit  ) url += `&limit=${limit}`;
        if ( page   ) url += `&page=${page}`;
        if ( search ) url += `&s=${search}`;

        if ( token ) return apiRequest('GET', BASE_URL + url, {}, {})
    },

    updateLocationsAPI: async (locationId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', BASE_URL + `/api/customer/update/${locationId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    }
}

export default locationApi