import { api } from "./api";
import { endpoints } from "./endpoint";

const token = localStorage.getItem('token');

const getUsersAPI = async () => {
  let config = {
    method: "GET",
    url: endpoints.getUsers,
  };

  const response = await api(config);
  return response[0];
};

const getUserRoleAPI = async (userId) => {
  let config = {
    method: "GET",
    url: `/api/role/user-role/${userId}?access-token=${token}`,
  };

  const response = await api(config);
  return response.role;
};

const addUserAPI = async (data) => {
  let config = {
    method: "POST",
    url: endpoints.addUser,
    data: data,
  };

  const response = await api(config);
  return response;
};
const getFacilityApi = async (facilityId) => {
  let config = {
    method: "GET",
    url: `/api/facilities/${facilityId}?access-token=${token}`,
  };

  const response = await api(config);

  return response.facility;
};
const addFacilityImageApi = async (facilityId, dataImg) => {
  let config = {
    method: "POST",
    url: `/api/facilities/${facilityId}/image/create?access-token=${token}`,
    data: dataImg,
  };

  const response = await api(config);
  return response;
};
const deleteFacilityImageAPI = async (imageId) => {
  let config = {
    method: "DELETE",
    url: `/api/facilities/image/delete/${imageId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};
export {
  getUsersAPI,
  getUserRoleAPI,
  addUserAPI,
  getFacilityApi,
  addFacilityImageApi,
  deleteFacilityImageAPI,
};
