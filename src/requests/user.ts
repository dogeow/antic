import axios from "../instance/axios";

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
