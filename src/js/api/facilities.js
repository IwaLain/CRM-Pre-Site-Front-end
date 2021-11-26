import { Global } from "./api"

const token = localStorage.getItem("token");

const getFacilities = async () => {
    return Global('GET', `/api/facilities?access-token=${token}`)
}

const getFacility = async (facilityId) => {
    return Global('GET', `/api/facilities/${facilityId}?access-token=${token}`)
}

const addFacilities = async (data) => {
    return Global('POST', `/api/facilities/create?access-token=${token}`, data)
}

const editFacilities = async (facilityId, data) => {
    return Global('PUT', `/api/facilities/update/${facilityId}?access-token=${token}`, data)
}

const deleteFacilities = async (facilityId) => {
    return Global('DELETE', `/api/facilities/delete/${facilityId}?access-token=${token}`)
}

const deleteFacilityImage = async (facilityId, imageId) => {
  return Global('DELETE', `/api/facilities/${facilityId}/image/delete/${imageId}?access-token=${token}`)
}

const addFacilityImage = async (facilityId, data) => {
  return Global('POST', `/api/facilities/${facilityId}/image/create?access-token=${token}`, data)
}

const setMainFacilityImage = async (facilityId, imageId) => {
  return Global('PUT', `/api/facilities/${facilityId}/set-main-image/${imageId}?access-token=${token}`)
}

export const facilitiesApi = {
    getFacilities,
    getFacility,
    addFacilities,
    editFacilities,
    deleteFacilities,
    deleteFacilityImage,
    addFacilityImage,
    setMainFacilityImage
}
