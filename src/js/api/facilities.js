import { api } from "./api";
import { endpoints } from "./endpoint";

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
    url: `/api/role/user-role/${userId}?access-token=`,
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
    url: `/api/facilities/${facilityId}?access-token=`,
  };

  const response = await api(config);

  return response.facility;
};
export { getUsersAPI, getUserRoleAPI, addUserAPI, getFacilityApi };
