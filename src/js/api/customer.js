import { api } from "./api";

const token = localStorage.getItem("token");

const getCustomersAPI = async (limit, page, search) => {
  let url = `/api/customer?access-token=${token}`;
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

const getCustomerAPI = async (customerId) => {
  let config = {
    method: "GET",
    url: `/api/customer/${customerId}?access-token=${token}`,
  };

  const response = await api(config);
  return response.customer;
};

const getCustomerFacilities = async (limit, page, search, customerId) => {
  let url = `/api/customer/${customerId}/facilities?access-token=${token}`;
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

const getCustomerEquipment = async (limit, page, search, customerId) => {
  let url = `/api/customer/${customerId}/equipment?access-token=${token}`;
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

const addCustomerAPI = async (data) => {
  let config = {
    method: "POST",
    url: `/api/customer/create?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

const addCustomerImageAPI = async (customerId, dataImg) => {
  let config = {
    method: "POST",
    url: `/api/customer/${customerId}/image/create?access-token=${token}`,
    data: dataImg,
  };

  const response = await api(config);
  return response;
};
const deleteCustomerImageAPI = async (customerId, imageId) => {
  let config = {
    method: "DELETE",
    url: `/api/customer/${customerId}/image/delete/${imageId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};
const setMainCustomerImageAPI = async (customerId, imageId) => {
  let config = {
    method: "PUT",
    url: `/api/customer/${customerId}/set-main-image/${imageId}?access-token=${token}`,
  };

  const response = await api(config);

  return response;
};
export {
  getCustomersAPI,
  getCustomerAPI,
  getCustomerFacilities,
  getCustomerEquipment,
  addCustomerAPI,
  addCustomerImageAPI,
  deleteCustomerImageAPI,
  setMainCustomerImageAPI,
};
