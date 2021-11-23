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

const getEquipments = async () => {
    return Global('GET', `/api/equipment?access-token=${token}`)
}

const getEquipment = async (equipmentId) => {
    return Global('GET', `/api/equipment/${equipmentId}?access-token=${token}`)
}

const addEquipment = async (data) => {
    return Global('POST', `/api/equipment/create?access-token=${token}`, data)
}

const editEquipment = async (equipmentId, data) => {
    return Global('PUT', `/api/equipment/update/${equipmentId}?access-token=${token}`, data)
}

const deleteEquipment = async (equipmentId) => {
    return Global('DELETE', `/api/equipment/delete/${equipmentId}?access-token=${token}`)
}

const deleteImageEquipment = async (equipmentImageId) => {
    return Global('DELETE', `/api/equipment/image/delete/${equipmentImageId}?access-token=${token}`)
}

const createImageEquipment = async (equipmentImageId, data) => {
    return Global('POST', `/api/equipment/${equipmentImageId}/image/create?access-token=${token}`, data)
}

export const equipment = {
    getEquipments,
    getEquipment,
    addEquipment,
    editEquipment,
    deleteEquipment,
    deleteImageEquipment,
    createImageEquipment,
}