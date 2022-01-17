import { getToken } from "../helpers/helpers";
import { apiRequest, header, BASE_URL } from "./api";

const networkApi = {
  createGetaway: async (data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "POST",
        BASE_URL + `/api/gateway/create?access-token=${token}`,
        data,
        header
      );
  },

  updateGetaway: async (id, data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "PUT",
        BASE_URL + `/api/gateway/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  getGetaway: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/gateway/${id}?access-token=${token}`
      );
  },

  getAllGetaway: async () => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/gateway/list?access-token=${token}`
      );
  },

  getByCustomerGetaway: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/customer/${id}/gateway?access-token=${token}`
      );
  },

  getByFacilityGetaway: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/facility/${id}/gateway?access-token=${token}`
      );
  },

  getTypeImageGetaway: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/gateway/type-images?access-token=${token}`
      );
  },

  deleteGetaway: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "delete",
        BASE_URL + `/api/gateway/delete/${id}?access-token=${token}`
      );
  },

  createNode: async (data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "POST",
        BASE_URL + `/api/node/create?access-token=${token}`,
        data,
        header
      );
  },

  updateNode: async (id, data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "PUT",
        BASE_URL + `/api/node/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  getNode: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/node/${id}?access-token=${token}`
      );
  },

  getAllNode: async () => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/node/list?access-token=${token}`
      );
  },

  deleteNode: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "delete",
        BASE_URL + `/api/delete/delete/${id}?access-token=${token}`
      );
  },

  createMote: async (data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "POST",
        BASE_URL + `/api/mote/create?access-token=${token}`,
        data,
        header
      );
  },

  updateMote: async (id, data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "PUT",
        BASE_URL + `/api/mote/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  getMote: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/mote/${id}?access-token=${token}`
      );
  },

  getAllMote: async () => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/mote/list?access-token=${token}`
      );
  },

  deleteMote: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "delete",
        BASE_URL + `/api/mote/delete/${id}?access-token=${token}`
      );
  },

  createRouter: async (data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "POST",
        BASE_URL + `/api/router/create?access-token=${token}`,
        data,
        header
      );
  },

  updateRouter: async (id, data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "PUT",
        BASE_URL + `/api/router/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  getRouter: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/router/${id}?access-token=${token}`
      );
  },

  getAllRouter: async () => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/routers/list?access-token=${token}`
      );
  },

  deleteRouter: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "delete",
        BASE_URL + `/api/router/delete/${id}?access-token=${token}`,
        {},
        {}
      );
  },

  createSensor: async (data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "POST",
        BASE_URL + `/api/sensor/create?access-token=${token}`,
        data,
        header
      );
  },

  updateSensor: async (id, data) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "PUT",
        BASE_URL + `/api/sensor/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  getSensor: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/sensor/${id}?access-token=${token}`,
        {},
        {}
      );
  },

  getAllSensor: async () => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "GET",
        BASE_URL + `/api/sensors/list?access-token=${token}`
      );
  },

  deleteSensor: async (id) => {
    const token = getToken();

    if (token)
      return await apiRequest(
        "delete",
        BASE_URL + `/api/sensor/delete/${id}?access-token=${token}`
      );
  },
};

export default networkApi;
