import { getToken } from "../helpers/helpers";
import { apiRequest, header, BASE_URL } from "./api";

const User = {
  get: () => {
    const token = getToken();

    if (token)
      return apiRequest("GET", BASE_URL + `/api/user?access-token=${token}`);
  },

  editRole: (id, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/role/assign-role/${id}?access-token=${token}`,
        data,
        header
      );
  },

  create: (data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "POST",
        BASE_URL + `/api/user/create?access-token=${token}`,
        data,
        header
      );
  },

  edite: (id, data) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "PUT",
        BASE_URL + `/api/user/update/${id}?access-token=${token}`,
        data,
        header
      );
  },

  delete: (id) => {
    const token = getToken();

    if (token)
      return apiRequest(
        "delete",
        BASE_URL + `/api/user/delete/${id}?access-token=${token}`
      );
  },
};

export default User;
