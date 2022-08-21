import { Typography } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { logged } from "../../helpers";
import axios from "../../instance/axios.js";
import { isExpiredState, usersState, userState } from "../../states";

export default () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [, setUser] = useRecoilState(userState);
  const [, setUsers] = useRecoilState(usersState);
  const [, setIsExpired] = useRecoilState(isExpiredState);

  return (
    <Typography
      variant="body2"
      style={{ color: "#f50057" }}
      onClick={() => {
        axios.post("user/guest").then(({ data }) => {
          logged(data);
          const userData = {
            token: "Bearer " + data.access_token,
            userId: data.id,
            userName: data.name,
            userEmail: data.email,
          };
          setUser(userData);
          setUsers((oldUsers) => [...oldUsers, userData]);
          setIsExpired(false);
          if (state) {
            navigate(state.from);
          } else {
            navigate("/");
          }
        });
      }}
    >
      免密登录测试账号
    </Typography>
  );
};
