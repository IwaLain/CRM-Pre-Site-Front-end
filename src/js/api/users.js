import { Global } from "./api"
const token = localStorage.getItem('token')

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

const deleteUser = async (userId) => {
    return Global('DELETE', `/api/user/delete/${userId}?access-token=${token}`)
}

export const user = {
    getUsers,
    editUserRole,
    addUser,
    editeUser,
    deleteUser
}