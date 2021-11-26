import { Global } from "./api";

const getLocations = async (limit, page, search) => {
  let url = `/api/location/list?access-token=${localStorage.getItem("token")}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (search) url += `&s=${search}`;
  return Global("GET", url);
};

const getLocationTree = async () => {
  return Global(
    "GET",
    `/api/location/tree?access-token=${localStorage.getItem("token")}`
  );
};

const addLocation = async (data) => {
  return Global(
    "POST",
    `/api/location/create?access-token=${localStorage.getItem("token")}`,
    data
  );
};

const editLocation = async (locationId, data) => {
  return Global(
    "PUT",
    `/api/location/update/${locationId}?access-token=${localStorage.getItem(
      "token"
    )}`,
    data
  );
};

const deleteLocation = async (locationId) => {
  return Global(
    "DELETE",
    `/api/location/delete/${locationId}?access-token=${localStorage.getItem(
      "token"
    )}`
  );
};

const getLocation = async (locationId) => {
  return Global(
    "GET",
    `/api/location/${locationId}?access-token=${localStorage.getItem("token")}`
  );
};

const getFacilityLocations = async (limit, page, search, facilityId) => {
  let url = `/api/facility/${facilityId}/locations?access-token=${localStorage.getItem(
    "token"
  )}`;
  if (limit) url += `&limit=${limit}`;
  if (page) url += `&page=${page}`;
  if (search) url += `&s=${search}`;
  return Global("GET", url);
};

const updateLocationsAPI = async (locationId, dataLocation) => {
  return Global(
    "PUT",
    `/api/customer/update/${locationId}?access-token=${localStorage.getItem(
      "token"
    )}`,
    dataLocation
  );
};

export const location = {
  getLocationTree,
  addLocation,
  editLocation,
  deleteLocation,
  getLocation,
  getLocations,
  getFacilityLocations,
  updateLocationsAPI,
};
