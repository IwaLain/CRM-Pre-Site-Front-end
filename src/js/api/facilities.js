import { Global } from "./api"

const token = localStorage.getItem('token')

const getFacilities = async () => {
    return Global('GET', `/api/facilities?access-token=${token}`)
}

const getFacility = async (FacilitiesId) => {
    return Global('GET', `/api/facilities/${FacilitiesId}?access-token=${token}`)
}

const addFacilities = async (data) => {
    return Global('POST', `/api/facilities/create?access-token=${token}`, data)
}

const editFacilities = async (FacilitiesId, data) => {
    return Global('PUT', `/api/facilities/update/${FacilitiesId}?access-token=${token}`, data)
}

const deleteFacilities = async (FacilitiesId) => {
    return Global('DELETE', `/api/facilities/delete/${FacilitiesId}?access-token=${token}`, data)
}

const deleteImageFacilities = async (FacilitiesImageId) => {
    return Global('DELETE', `/api/facilities/image/delete/${FacilitiesImageId}?access-token=${token}`)
}

const createImageFacilities = async (FacilitiesImageId, data) => {
    return Global('POST', `/api/facilities/${FacilitiesImageId}/image/create?access-token=${token}`, data)
}

export const facilities = {
    getFacilities,
    getFacility,
    addFacilities,
    editFacilities,
    deleteFacilities,
    deleteImageFacilities,
    createImageFacilities,
}