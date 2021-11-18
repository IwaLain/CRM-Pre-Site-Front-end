import { api } from "./api";
import { endpoints } from "./endpoint";

const getCustomersAPI = async () => {
  let config = {
    method: "GET",
    url: endpoints.getCustomers,
  };

  const response = await api(config);
  return response.customers;
};

const getCustomerAPI = async (customerId) => {
  let config = {
    method: "GET",
    url: `/api/customer/${customerId}?access-token=`,
  };

  const response = await api(config);
  return response.customer;
};

const addCustomerAPI = async (data) => {
  let config = {
    method: "POST",
    url: endpoints.addCustomer,
    data: data,
  };

  const response = await api(config);
  return response;
};

export { getCustomersAPI, getCustomerAPI, addCustomerAPI };
