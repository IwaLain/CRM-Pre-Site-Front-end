import { api } from "./api"
import { endpoints } from "./endpoint"

const getFacilitiesAPI = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getUsers
    }

    const response = await api(config)
    return response[0]
}

const addFacilitiesAPI = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.addUser,
        data: data
    }

    const response = await api(config)
    return response
}

export const user = {
    getFacilitiesAPI,
    addFacilitiesAPI
}