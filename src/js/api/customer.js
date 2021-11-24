import { Global } from "./api"

const token = localStorage.getItem('token')

const getCustomers = async () => {
    return Global('GET', `/api/customer?access-token=${token}`)
}

const getCustomer = async (customerId) => {
    return Global('GET', `/api/customer/:${customerId}?access-token=${token}`)
}

const addCustomer = async (data) => {
    return Global('POST', `/api/customer/create?access-token=${token}`, data)
} 

export const customer = {
    getCustomers,
    getCustomer,
    addCustomer
}