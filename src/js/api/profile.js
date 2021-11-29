import { Global } from "./api";

const getProfile = async () => {
  return Global(
    "GET",
    `/api/user/profile?access-token=${localStorage.getItem("token")}`
  );
};

export const profile = {
  getProfile,
};
