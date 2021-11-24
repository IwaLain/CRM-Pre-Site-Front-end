import { Global } from "./api"

const getUsers = async () => {
    return Global('GET', `/api/user?access-token=`)
}

const editUserRole = async (userId, data) => {
    return Global('POST', `/api/role/assign-role/${userId}?access-token=`, data)
}

const addUser = async (data) => {
    return Global('POST', `/api/user/create?access-token=`, data)
}

const editeUser = async (userId, data) => {
    return Global('PUT', `/api/user/update/${userId}?access-token=`, data)
}

export const user = {
    getUsers,
    editUserRole,
    addUser,
    editeUser
}