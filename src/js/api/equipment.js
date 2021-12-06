import { getToken } from "../helpers/helpers";
import { apiRequest } from "./api";
import { BASE_URL } from "./constants";

const equipmentApi = {
  getEquipments: async () => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/equipment?access-token=${token}`,
        {},
        {}
      );
  },

  getEquipment: async (equipmentId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/equipment/${equipmentId}?access-token=${token}`,
        {},
        {}
      );
  },

  getEquipmentTypes: async () => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/equipment/type?access-token=${token}`,
        {},
        {}
      );
  },

  addEquipment: async (data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/equipment/create?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  editEquipment: async (equipmentId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/equipment/update/${equipmentId}?access-token=${token}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
  },

  deleteEquipment: async (equipmentId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "DELETE",
        BASE_URL + `/api/equipment/delete/${equipmentId}?access-token=${token}`,
        {},
        {}
      );
  },

  deleteImageEquipment: async (equipmentImageId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "DELETE",
        BASE_URL +
          `/api/equipment/image/delete/${equipmentImageId}?access-token=${token}`,
        {},
        {}
      );
  },

  createImageEquipment: async (equipmentImageId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "DELETE",
        BASE_URL +
          `/api/equipment/${equipmentImageId}/image/create?access-token=${token}`,
        data,
        {}
      );
  },

  getLocationEquipment: async (limit, page, search, locationId) => {
    const token = getToken();
    let url = `/api/location/${locationId}/equipment?access-token=${token}`;

    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&search=${search}`;

    if (token) return apiRequest("GET", BASE_URL + url, {}, {});
  },
};

export default equipmentApi;
