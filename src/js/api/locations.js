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

export { getLocation, getLocations, getFacilityLocations };
