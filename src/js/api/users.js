import { Global } from "./api";

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
