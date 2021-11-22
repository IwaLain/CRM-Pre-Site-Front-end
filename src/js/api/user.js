import { api } from "./api"
import { endpoints } from "./endpoint"

const getUsersAPI = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getUsers
    }

    const response = await api(config)
    return response.user
}

const editUserRoleAPI = async (userId, data) => {
    let config = {
        method: 'POST',
        url: `/api/role/assign-role/${userId}?access-token=${localStorage.getItem('token')}`,
        data: data
    }

    const response = await api(config)
    return response.role
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

const editeUserAPI = async (userId, data) => {
    let config = {
        method: 'PUT',
        url: endpoints.editeUser + userId + '?access-token=' + localStorage.getItem('token'),
        data: data
    }

    const response = await api(config)
    return response
}

export const user = {
    getUsersAPI,
    editUserRoleAPI,
    addUserAPI,
    editeUserAPI
}