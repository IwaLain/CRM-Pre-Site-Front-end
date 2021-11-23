import { api } from "./api"
import { endpoints } from "./endpoint"

const token = localStorage.getItem('token')

const getEquipments = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getEquipment
    }

    const response = await api(config)
    return response.equipment
}

const getEquipment = async (equipmentId) => {
    let config = {
        method: 'GET',
        url: `/api/equipment?access-token=${token}`
    }

    const response = await api(config)
    return response.equipment
}

const addEquipment = async (data) => {
    let config = {
        method: 'POST',
        url: `/api/equipment/create?access-token=${token}`,
        data: data
    } 

    const response = await api(config)
    return response
}

const editEquipment = async (equipmentId, data) => {
    let config = {
        method: 'PUT',
        url: `/api/equipment/update/${equipmentId}?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

const deleteEquipment = async (equipmentId) => {
    let config = {
        method: 'DELETE',
        url: `/api/equipment/delete/${equipmentId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const deleteImageEquipment = async (equipmentImageId) => {
    let config = {
        method: 'DELETE',
        url: `/api/equipment/image/delete/${equipmentImageId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const createImageEquipment = async (equipmentImageId, data) => {
    let config = {
        method: 'POST',
        url: `/api/equipment/${equipmentImageId}/image/create?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
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