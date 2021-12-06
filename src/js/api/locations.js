import { getToken } from "../helpers/helpers";
import { apiRequest } from "./api";
import { BASE_URL } from "./constants";

const locationApi = {
  getLocations: async (limit, page, search) => {
    const token = getToken();
    let url = `/api/location/list?access-token=${token}`;

    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&search=${search}`;

    if (token) return apiRequest("GET", BASE_URL + url, {}, {});
  },

  getLocationTree: async () => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/location/tree?access-token=${token}`,
        {},
        {}
      );
  },

  addLocation: async (data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/location/create?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  editLocation: async (id, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/location/update/${id}?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  deleteLocation: async (id) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "DELETE",
        BASE_URL + `/api/location/delete/${id}?access-token=${token}`,
        {},
        {}
      );
  },

  getLocation: async (id) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/location/${id}?access-token=${token}`,
        {},
        {}
      );
  },

  getFacilityLocations: async (limit, page, search, facilityId) => {
    const token = getToken();
    let url = `/api/facility/${facilityId}/locations?access-token=${token}`;

    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&search=${search}`;

    if (token) return apiRequest("GET", BASE_URL + url, {}, {});
  },

  updateLocationsAPI: async (id, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/customer/update/${id}?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  addLocationImage: async (locationId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL +
          `/api/location/${locationId}/image/create?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  deleteLocationImage: async (locationId, imageId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "DELETE",
        BASE_URL +
          `/api/location/${locationId}/image/delete/${imageId}?access-token=${token}`,
        {},
        {}
      );
  },
  setMainLocationImage: async (locationId, imageId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL +
          `/api/location/${locationId}/set-main-image/${imageId}?access-token=${token}`,
        {},
        {
          "Content-Type": "application/json",
        }
      );
  },
};

export default locationApi;
