import { getToken } from "../helpers/helpers";
import { apiRequest, header, BASE_URL } from "./api";

const equipmentApi = {
  getEquipments: async (limit, page, search) => {
    const token = getToken();

    let url =
      process.env.REACT_APP_SERVER_URL + `/api/equipment?access-token=${token}`;

    if (limit) url += `&limit=${limit}`;
    if (page) url += `&page=${page}`;
    if (search) url += `&search=${search}`;

    if (token) return apiRequest("GET", url, {}, {});
  },

  getEquipment: async (equipmentId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/equipment/${equipmentId}?access-token=${token}`
      );
  },

  getEquipmentTypes: async () => {
    const token = getToken();

    if (token)
      return apiRequest(
        "GET",
        BASE_URL + `/api/equipment/type?access-token=${token}`
      );
  },

  addEquipment: async (data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/equipment/create?access-token=${token}`,
        data,
        header
      );
  },

  editEquipment: async (equipmentId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/equipment/update/${equipmentId}?access-token=${token}`,
        data,
        header
      );
  },

  deleteEquipment: async (equipmentId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "delete",
        BASE_URL + `/api/equipment/delete/${equipmentId}?access-token=${token}`
      );
  },

  deleteImageEquipment: async (equipmentId, equipmentImageId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "delete",
        BASE_URL +
          `/api/equipment/${equipmentId}/image/delete/${equipmentImageId}?access-token=${token}`
      );
  },

  createImageEquipment: async (equipmentImageId, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL +
          `/api/equipment/${equipmentImageId}/image/create?access-token=${token}`,
        data,
        header
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
  setMainEquipmentImage: async (equipmentId, imageId) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL +
          `/api/equipment/${equipmentId}/set-main-image/${imageId}?access-token=${token}`,
        {},
        header
      );
  },
};

export default equipmentApi;
