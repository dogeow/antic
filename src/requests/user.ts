import axios from "../instance/axios";

export const logoutRequest = (token: string) => {
  console.log("注销此 token:" + token);
  return axios.post("/user/logout");
};
