import { Global } from "./api"

const token = localStorage.getItem('token')

const getLocationList = async () => {
    return Global('GET', `/api/location/list?access-token=${token}`)
}

const getLocationTree = async () => {
    return Global('GET', `/api/location/tree?access-token=${token}`)
}

const addLocation = async (data) => {
    return Global('POST', `/api/location/create?access-token=${token}`, data)
}

const editLocation = async (locationId, data) => {
    return Global('PUT', `/api/location/update/${locationId}?access-token=${token}`, data)
}

const deleteLocation = async (locationId) => {
    return Global('DELETE', `/api/location/delete/${locationId}?access-token=${token}`)
}

export const location = {
    getLocationList,
    getLocationTree,
    addLocation,
    editLocation,
    deleteLocation,
}