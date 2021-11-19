import { api } from "./api";

const token = "test";

const getCustomersAPI = async (limit, search, page) => {
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

const addCustomerAPI = async (data) => {
  let config = {
    method: "POST",
    url: `/api/customer/create?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

export { getCustomersAPI, getCustomerAPI, addCustomerAPI };
