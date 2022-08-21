import axios from "../instance/axios.js";

export const logoutRequest = (token) =>
  axios.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
