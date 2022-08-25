import axios from "../instance/axios";

export const logoutRequest = (token: string) =>
  axios.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
