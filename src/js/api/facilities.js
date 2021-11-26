import { api } from "./api"

<<<<<<< HEAD
const token = localStorage.getItem("token");
=======
const token = localStorage.getItem('token')
>>>>>>> 46d90e9fb9e1c2f511625f5d41cde3ae94609dc7

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

<<<<<<< HEAD
  return response.facility[facilityId];
};

const getFacilities = async () => {
  let config = {
    method: "GET",
    url: `/api/facilities?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};

const createFacility = async (data) => {
  let config = {
    method: "POST",
    url: `/api/facilities/create?access-token=${token}`,
    data,
  };

  const response = await api(config);
  return response;
};

=======
>>>>>>> 46d90e9fb9e1c2f511625f5d41cde3ae94609dc7
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
const updateFacilityAPI = async (facilityId, dataFacility) => {
  let config = {
    method: "PUT",
    url: `/api/facilities/update/${facilityId}?access-token=${token}`,
    data: dataFacility,
  };

  const response = await api(config);
  return response;
};
export {
  getFacilities,
  getFacilityApi,
<<<<<<< HEAD
  getFacilities,
  createFacility,
=======
  addFacilities,
  editFacilities,
  deleteFacilities,
>>>>>>> 46d90e9fb9e1c2f511625f5d41cde3ae94609dc7
  addFacilityImageApi,
  deleteFacilityImageAPI,
  setMainFacilityImageAPI,
  updateFacilityAPI,
};
