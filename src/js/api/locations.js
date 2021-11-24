import { api } from "./api";

const token = localStorage.getItem("token");

const getLocation = async (locationId) => {
  let config = {
    method: "GET",
    url: `/api/location/${locationId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};

const getLocations = async () => {
  let config = {
    method: "GET",
    url: `/api/location/list?access-token=${token}`,
  };

  const response = await api(config);
  return response;
};

const getLocationTree = async () => {
  let config = {
    method: "GET",
    url: `/api/location/tree?access-token=${token}`,
  };

  const response = await api(config);
  return response.location;
};

const addLocation = async (data) => {
  let config = {
    method: "POST",
    url: `/api/location/create?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

const editLocation = async (locationId, data) => {
  let config = {
    method: "PUT",
    url: `/api/location/update/${locationId}?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

const deleteLocation = async (locationId) => {
  let config = {
    method: "DELETE",
    url: `/api/location/delete/${locationId}?access-token=${token}`,
  };

  const response = await api(config);
  return response;
};
const getLocationAPI = async (locationId) => {
  let config = {
    method: "GET",
    url: `/api/location/${locationId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};

const getFacilityLocations = async (limit, page, search, facilityId) => {
  let url = `/api/facility/${facilityId}/locations?access-token=${token}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (search) url += `&s=${search}`;

  let config = {
    method: "GET",
    url,
  };

  const response = await api(config);

  return response;
};
export {
  getLocationTree,
  addLocation,
  editLocation,
  deleteLocation,
  getLocationAPI,
  getLocations,
  getFacilityLocations,
};
