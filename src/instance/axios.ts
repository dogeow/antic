import "sweetalert2/dist/sweetalert2.min.css";

import axios from "axios";
import Swal from "sweetalert2";

import { getItem, setItem } from "../helpers";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
  withCredentials: true,
});

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const accessToken = getItem("user.accessToken");
if (accessToken) {
  instance.defaults.headers.common.Authorization = accessToken;
}

instance.interceptors.request.use(
  (request) => {
    if (import.meta.env.DEV) {
      console.group("请求");
      window.console.log(request);
      console.groupEnd();
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.group("返回");
      window.console.log(response);
      console.groupEnd();
    }
    const newToken = response.headers.authorization;
    if (newToken) {
      const user = getItem("user");
      setItem("user", { ...user, accessToken: newToken });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.config.url === "/user/logout") {
        return error;
      }
      const { status } = error.response;
      switch (status) {
        case 400:
          window.console.log(error);
          Swal.fire("提示️", error.response.data.message, "error");
          break;
        case 401:
          const text = getItem("user.accessToken") ? "登录状态过期" : "尚未登录账号";
          Swal.fire("提示️", text, "warning");
          localStorage.removeItem("token");
          break;
        case 422:
          break;
        default:
          Swal.fire("提示️", error.response.statusText || error.response.message, "error");
      }
    }
    return Promise.reject(error.response);
  }
);

export default instance;
