import { api } from "./api" 
const token = localStorage.getItem('token')

const Global = async (method, url, data = '') => {
    const config = {
        method,
        url,
        data
    }

    const response = await api(config)
    return response
}

const getProfile = async (userId) => {
    return Global('GET', `/api/customer/:${userId}?access-token=${token}`)
}

const getUsers = async () => {
   return Global('GET', `/api/user?access-token=${token}`)
}

const editUserRole = async (userId, data) => {
    return Global('POST', `/api/role/assign-role/${userId}?access-token=${token}`, data)
}

const addUser = async (data) => {
    return Global('POST', `/api/user/create?access-token=${token}`, data)
}

const editeUser = async (userId, data) => {
    return Global('PUT', `/api/user/update/${userId}?access-token=${token}`, data)
}

export const profile = {
    getProfile,
    getUsers,
    editUserRole,
    addUser,
    editeUser
}