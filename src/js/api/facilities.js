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

const getFacilityApi = async (FacilitiesId) => {
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

const addFacilityImageApi = async (facilityId, dataImg) => {
  let config = {
    method: "POST",
    url: `/api/facilities/${facilityId}/image/create?access-token=${token}`,
    data: dataImg,
  };

  const response = await api(config);
  return response;
};
const deleteFacilityImageAPI = async (facilityId, imageId) => {
  let config = {
    method: "DELETE",
    url: `/api/facilities/${facilityId}/image/delete/${imageId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};
const setMainFacilityImageAPI = async (facilityId, imageId) => {
  let config = {
    method: "PUT",
    url: `/api/facilities/${facilityId}/set-main-image/${imageId}?access-token=${token}`,
  };
  const response = await api(config);

  return response;
};
export {
  getFacilities,
  getFacilityApi,
  addFacilities,
  editFacilities,
  deleteFacilities,
  addFacilityImageApi,
  deleteFacilityImageAPI,
  setMainFacilityImageAPI,
};
