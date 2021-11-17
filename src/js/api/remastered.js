import { api, login } from "./api"
import { endpoints } from "./endpoint"

const loginAPI = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.login,
        data: data
    }

    const response = await login(config)
    return response
}

const getUsersAPI = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getUsers
    }

    const response = await api(config)
    return response[0]
}

const getProfileAPI = async (userId) => {
    let config = {
        method: 'GET',
        url: `/api/customer/:${userId}?access-token=`
    }

    const response = await api(config)
    return response
}

const getEquipmentAPI = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getEquipment
    }

    const response = await api(config)
    return response.equipment
}

const addUserAPI = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.addUser,
        data: data
    }

    const response = await api(config)
    return response
}

export const getAPI = {
    loginAPI,
    getUsersAPI,
    getProfileAPI,
    getEquipmentAPI,
    addUserAPI
}