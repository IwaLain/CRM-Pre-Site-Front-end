import { getToken } from '../methods/helpers'
import { apiRequest } from "./api"
import { URL } from './constants'
import { Global } from "./api";

const User = {
    getUsers: () => {
        const token = getToken()

        if ( token ) return apiRequest( 'GET', URL + `/api/user?access-token=${localStorage.getItem("token")}`, {}, {})
    },

    editUserRole: (userId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', URL + `/api/role/assign-role/${userId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    addUser: (data) => {
        const token = getToken()

        if ( token ) return apiRequest('POST', URL + `/api/user/create?access-token=${token}`, data, {
            'Content-Type':'application/json'
        })
    },

    editeUser: (userId, data) => {
        const token = getToken()

        if ( token ) return apiRequest('PUT', URL + `/api/user/update/${userId}?access-token=${token}`, data, {
            'Content-Type':'application/json'
        }) 
    },

    deleteUser: (userId) => {
        const token = getToken()

        if ( token ) return apiRequest('DELETE', URL + `/api/user/delete/${userId}?access-token=${token}`, {}, {
            'Content-Type':'application/json'
        })
    }
}

export default User


const getUsers = async () => {
  return Global(
    "GET",
    `/api/user?access-token=${localStorage.getItem("token")}`
  );
};

const editUserRole = async (userId, data) => {
  return Global(
    "POST",
    `/api/role/assign-role/${userId}?access-token=${localStorage.getItem(
      "token"
    )}`,
    data
  );
};

const addUser = async (data) => {
  return Global(
    "POST",
    `/api/user/create?access-token=${localStorage.getItem("token")}`,
    data
  );
};

const editeUser = async (userId, data) => {
  return Global(
    "PUT",
    `/api/user/update/${userId}?access-token=${localStorage.getItem("token")}`,
    data
  );
};

const deleteUser = async (userId) => {
  return Global(
    "DELETE",
    `/api/user/delete/${userId}?access-token=${localStorage.getItem("token")}`
  );
};

export const user = {
  getUsers,
  editUserRole,
  addUser,
  editeUser,
  deleteUser,
};
