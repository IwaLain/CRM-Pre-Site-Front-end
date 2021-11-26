import { Global } from "./api"

const token = localStorage.getItem('token')

const getCustomers = async (limit, page, search) => {
    let url = `/api/customer?access-token=${token}`;
    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&s=${search}`;
    return Global('GET', url)
}

const getCustomer = async (customerId) => {
    return Global('GET', `/api/customer/${customerId}?access-token=${token}`)
}

const addCustomer = async (data) => {
    return Global('POST', `/api/customer/create?access-token=${token}`, data)
} 

const addCustomerImage = async (customerId, data) => {
    return Global('POST', `/api/customer/${customerId}/image/create?access-token=${token}`, data)
} 

const deleteCustomerImage = async (customerId, imageId) => {
    return Global('DELETE', `/api/customer/${customerId}/image/delete/${imageId}?access-token=${token}`)
} 

const setMainCustomerImage = async (customerId, imageId) => {
    return Global('PUT', `/api/customer/${customerId}/set-main-image/${imageId}?access-token=${token}`)
} 

const updateCustomer = async (customerId, dataCustomer) => {
    return Global('PUT', `/api/customer/update/${customerId}?access-token=${token}`, dataCustomer)
} 

const getCustomerFacilities = async (limit, page, search, customerId) => {
    let url = `/api/customer/${customerId}/facilities?access-token=${token}`;
    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&s=${search}`;

    return Global('GET', url)
} 

export const customersApi = {
    getCustomers,
    getCustomer,
    addCustomer,
    addCustomerImage,
    deleteCustomerImage,
    setMainCustomerImage,
    updateCustomer,
    getCustomerFacilities
}
