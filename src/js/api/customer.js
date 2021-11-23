import { api } from "./api"

const token = localStorage.getItem('token')

const Global = (method, url, data = '') => {
    const config = {
        method,
        url,
        data
    }

    const response = await api(config)
    return response
}

const getCustomers = async () => {
    return Global('GET', `/api/customer?access-token=${token}`)
}

const getCustomer = async (customerId) => {
    return Global('GET', `/api/customer/:${customerId}?access-token=${token}`)
}

const addCustomer = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.addCustomer,
        data: data
    }

    const response = await api(config)
    return response
} 

export const customer = {
    getCustomers,
    getCustomer,
    addCustomer
}