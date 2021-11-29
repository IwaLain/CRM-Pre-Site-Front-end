import { getToken } from "../helpers/helpers";
import { apiRequest } from "./api";
import { BASE_URL } from "./constants";

const facilitiesApi = {
  getFacilities: async () => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/facilities?access-token=${token}`,
        {},
        {}
      );
  },

  getFacility: async (facilityId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/facility/${facilityId}?access-token=${token}`,
        {},
        {}
      );
  },

  addFacilities: async (data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/facility/create?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  editFacilities: async (facilityId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/facilities/update/${facilityId}?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  deleteFacilities: async (facilityId) => {
    const token = getToken();

    if (token)
      apiRequest(
        "DELETE",
        BASE_URL + `/api/facilities/delete/${facilityId}?access-token=${token}`,
        {},
        {}
      );
  },

  deleteFacilityImage: async (facilityId, imageId) => {
    const token = getToken();

    if (token)
      apiRequest(
        "DELETE",
        BASE_URL +
          `/api/facilities/${facilityId}/image/delete/${imageId}?access-token=${token}`,
        {},
        {}
      );
  },

  addFacilityImage: async (facilityId, data) => {
    const token = getToken();

    if (token)
      apiRequest(
        "POST",
        BASE_URL +
          `/api/facilities/${facilityId}/image/create?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  setMainFacilityImage: async (facilityId, imageId) => {
    const token = getToken();

    if (token)
      apiRequest(
        "PUT",
        BASE_URL +
          `/api/facilities/${facilityId}/set-main-image/${imageId}?access-token=${token}`,
        {},
        {
          "Content-Type": "application/json",
        }
      );
  },
};

export default facilitiesApi;
