import { api } from "./api"
import { endpoints } from "./endpoint"

const getCustomersAPI = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getCustomers
    }

    const response = await api(config)
    return response.customers
}

const addCustomerAPI = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.addCustomer,
        data: data
    }

    const response = await api(config)
    return response
} 

export const customer = {
    getCustomersAPI,
    addCustomerAPI
}