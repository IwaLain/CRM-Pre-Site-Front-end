import { api } from "./api"
import { endpoints } from "./endpoint"

const getUsers = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getUsers
    }

    const response = await api(config)
    return response.user
}

const editUserRole = async (userId, data) => {
    let config = {
        method: 'POST',
        url: `/api/role/assign-role/${userId}?access-token=${localStorage.getItem('token')}`,
        data: data
    }
    
    const response = await api(config)
    return response
}

const addUser = async (data) => {
    let config = {
        method: 'POST',
        url: endpoints.addUser,
        data: data
    }

    const response = await api(config)
    return response
}

const editeUser = async (userId, data) => {
    let config = {
        method: 'PUT',
        url: endpoints.editeUser + userId + '?access-token=' + localStorage.getItem('token'),
        data: data
    }

    const response = await api(config)
    return response
}

export const user = {
    getUsers,
    editUserRole,
    addUser,
    editeUser
}