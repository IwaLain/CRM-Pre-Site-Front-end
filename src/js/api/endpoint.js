import { api } from "./api"

const loginAPI = async (data) => {
    let config = {
        method: 'POST',
        url: '/api/login',
        data: JSON.stringify(data)
    }
    const response = await api(config)
    console.log(response)
    return response
}

const getUsersAPI = async () => {
    let config = {
        method: 'GET',
        url: '/api/customer?access-token='
    }

    const response = await api(config)
    return response.customers
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
        url: '/api/equipment?access-token='
    }

    const response = await api(config)
    return response.equipment
}

const addUserAPI = async (data) => {
    let config = {
        method: 'POST',
        url: '/api/user/create?access-token='
    }

    const response = await api(config)
    return response
}

export const endpoints = {
    loginAPI,
    getUsersAPI,
    getProfileAPI,
    getEquipmentAPI,
    addUserAPI
}