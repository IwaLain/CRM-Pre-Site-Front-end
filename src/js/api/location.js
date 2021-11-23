import { api } from "./api"

const token = localStorage.getItem('token')

const getLocationList = async () => {
    let config = {
        method: 'GET',
        url: `/api/location/list?access-token=${token}`
    }

    const response = await api(config)
    return response.location
}

const getLocationTree = async () => {
    let config = {
        method: 'GET',
        url: `/api/location/tree?access-token=${token}`
    }

    const response = await api(config)
    return response.location
}

const addLocation = async (data) => {
    let config = {
        method: 'POST',
        url: `/api/location/create?access-token=${token}`,
        data: data
    } 

    const response = await api(config)
    return response
}

const editLocation = async (locationId, data) => {
    let config = {
        method: 'PUT',
        url: `/api/location/update/${locationId}?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

const deleteLocation = async (locationId) => {
    let config = {
        method: 'DELETE',
        url: `/api/location/delete/${locationId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

export const Location = {
    getLocationList,
    getLocationTree,
    addLocation,
    editLocation,
    deleteLocation,
}