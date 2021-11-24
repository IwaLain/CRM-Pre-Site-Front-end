import { api } from "./api";
import { endpoints } from "./endpoint";

const token = localStorage.getItem("token");

const getEquipmentAPI = async () => {
  let config = {
    method: "GET",
    url: endpoints.getEquipment,
  };

  const response = await api(config);
  return response;
};

const getLocationEquipment = async (limit, page, search, locationId) => {
  let url = `/api/location/${locationId}/equipment?access-token=${token}`;
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

export { getEquipmentAPI, getLocationEquipment };
