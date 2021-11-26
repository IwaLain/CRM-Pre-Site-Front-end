import { Global } from "./api"

const token = localStorage.getItem("token");

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

const getLocationEquipment = async (limit, page, search, locationId) => {
  let url = `/api/location/${locationId}/equipment?access-token=${token}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (search) url += `&s=${search}`;

  return Global('GET', url)
}

const setMainEquipmentImage = async (equipmentId, imageId) => {
    return Global('PUT', `/api/equipment/${equipmentId}/set-main-image/${imageId}?access-token=${token}`)
}

export const equipment = {
    getEquipments,
    getEquipment,
    addEquipment,
    editEquipment,
    deleteEquipment,
    deleteImageEquipment,
    createImageEquipment,
    setMainEquipmentImage,
    getLocationEquipment,
}
