<<<<<<< HEAD
import { api } from "./api";
import { endpoints } from "./endpoint";

const token = localStorage.getItem("token");

const getEquipments = async () => {
  let config = {
    method: "GET",
    url: endpoints.getEquipment,
  };

  const response = await api(config);
  return response;
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
const updateEquipmentAPI = async (equipmentId, dataEquipment) => {
  let config = {
    method: "PUT",
    url: `/api/equipment/update/${equipmentId}?access-token=${token}`,
    data: dataEquipment,
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
  getLocationEquipment,
  updateEquipmentAPI,
};
=======
import { api } from "./api"
import { endpoints } from "./endpoint"

const token = localStorage.getItem('token')

const getEquipments = async () => {
    let config = {
        method: 'GET',
        url: endpoints.getEquipment
    }

    const response = await api(config)
    return response.equipment
}

const getEquipment = async (equipmentId) => {
    let config = {
        method: 'GET',
        url: `/api/equipment?access-token=${token}`
    }

    const response = await api(config)
    return response.equipment
}

const addEquipment = async (data) => {
    let config = {
        method: 'POST',
        url: `/api/equipment/create?access-token=${token}`,
        data: data
    } 

    const response = await api(config)
    return response
}

const editEquipment = async (equipmentId, data) => {
    let config = {
        method: 'PUT',
        url: `/api/equipment/update/${equipmentId}?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

const deleteEquipment = async (equipmentId) => {
    let config = {
        method: 'DELETE',
        url: `/api/equipment/delete/${equipmentId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const deleteImageEquipment = async (equipmentImageId) => {
    let config = {
        method: 'DELETE',
        url: `/api/equipment/image/delete/${equipmentImageId}?access-token=${token}`
    }

    const response = await api(config)
    return response
}

const createImageEquipment = async (equipmentImageId, data) => {
    let config = {
        method: 'POST',
        url: `/api/equipment/${equipmentImageId}/image/create?access-token=${token}`,
        data: data
    }

    const response = await api(config)
    return response
}

export const equipment = {
    getEquipments,
    getEquipment,
    addEquipment,
    editEquipment,
    deleteEquipment,
    deleteImageEquipment,
    createImageEquipment,
}
>>>>>>> 46d90e9fb9e1c2f511625f5d41cde3ae94609dc7
