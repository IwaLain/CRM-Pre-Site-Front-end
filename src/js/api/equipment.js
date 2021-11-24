import { api } from "./api";
import { endpoints } from "./endpoint";

const token = localStorage.getItem("token");

const getEquipments = async () => {
  let config = {
    method: "GET",
    url: endpoints.getEquipment,
  };

  const response = await api(config);
  return response.equipment;
};

const getEquipment = async (equipmentId) => {
  let config = {
    method: "GET",
    url: `/api/equipment/${equipmentId}?access-token=${token}`,
  };

  const response = await api(config);
  return response.equipment;
};

const addEquipment = async (data) => {
  let config = {
    method: "POST",
    url: `/api/equipment/create?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

const editEquipment = async (equipmentId, data) => {
  let config = {
    method: "PUT",
    url: `/api/equipment/update/${equipmentId}?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};

const deleteEquipment = async (equipmentId) => {
  let config = {
    method: "DELETE",
    url: `/api/equipment/delete/${equipmentId}?access-token=${token}`,
  };

  const response = await api(config);
  return response;
};

const deleteImageEquipment = async (equipmentId, equipmentImageId) => {
  let config = {
    method: "DELETE",
    url: `/api/equipment/${equipmentId}/image/delete/${equipmentImageId}?access-token=${token}`,
  };

  const response = await api(config);
  return response;
};

const createImageEquipment = async (equipmentId, data) => {
  let config = {
    method: "POST",
    url: `/api/equipment/${equipmentId}/image/create?access-token=${token}`,
    data: data,
  };

  const response = await api(config);
  return response;
};
const setMainEquipmentImageAPI = async (equipmentId, imageId) => {
  let config = {
    method: "PUT",
    url: `/api/equipment/${equipmentId}/set-main-image/${imageId}?access-token=${token}`,
  };
  const response = await api(config);

  return response;
};

export {
  getEquipments,
  getEquipment,
  addEquipment,
  editEquipment,
  deleteEquipment,
  deleteImageEquipment,
  createImageEquipment,
  setMainEquipmentImageAPI,
};
