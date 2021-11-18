import { api } from "./api";
import { endpoints } from "./endpoint";

const getEquipmentAPI = async () => {
  let config = {
    method: "GET",
    url: endpoints.getEquipment,
  };

  const response = await api(config);
  return response.equipment;
};
