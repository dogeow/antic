import axios from "../instance/axios";
import { setItem } from "./index";

/**
 * 登录
 *
 * @param {object} data
 */
export const logged = (data: { accessToken: string; id: number; name: string; email: string }) => {
  const accessToken = `Bearer ${data.accessToken}`;
  setItem("user", { ...data, accessToken });
  axios.defaults.headers.common.Authorization = accessToken;
};

/**
 * 注销
 */
export const logout = () => {
  localStorage.removeItem("user");
};
