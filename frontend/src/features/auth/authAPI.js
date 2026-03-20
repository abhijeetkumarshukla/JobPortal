import API from "../../api/axios";

export const loginUserAPI = async (data) => {
  const res = await API.post("/user/login", data);
  return res.data;
};

export const registerUserAPI = async (data) => {
  const res = await API.post("/user/register", data);
  return res.data;
};