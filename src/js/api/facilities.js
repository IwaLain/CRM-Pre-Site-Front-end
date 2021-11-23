import { api } from "./api"

const token = localStorage.getItem('token')

const getFacilities = async () => {
    let config = {
        method: 'GET',
        url: `/api/facilities?access-token=${token}`
    }

    const response = await api(config)
    return response.Facilities
}

const getFacility = async (FacilitiesId) => {
    let config = {
        method: 'GET',
        url: `/api/facilities/${FacilitiesId}?access-token=${token}`
    }

    const response = await api(config)
    return response.Facilities
}

const addFacilities = async (data) => {
    let config = {
        method: 'POST',
        url: `/api/facilities/create?access-token=${token}`,
        data: data
    } 

    const response = await api(config)
    return response
}

const editFacilities = async (FacilitiesId, data) => {
    let config = {
        method: 'PUT',
        url: `/api/facilities/update/${FacilitiesId}?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

const deleteFacilities = async (FacilitiesId) => {
    let config = {
        method: 'DELETE',
        url: `/api/facilities/delete/${FacilitiesId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const deleteImageFacilities = async (FacilitiesImageId) => {
    let config = {
        method: 'DELETE',
        url: `/api/facilities/image/delete/${FacilitiesImageId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const createImageFacilities = async (FacilitiesImageId, data) => {
    let config = {
        method: 'POST',
        url: `/api/facilities/${FacilitiesImageId}/image/create?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

export const Facilities = {
    getFacilities,
    getFacility,
    addFacilities,
    editFacilities,
    deleteFacilities,
    deleteImageFacilities,
    createImageFacilities,
}