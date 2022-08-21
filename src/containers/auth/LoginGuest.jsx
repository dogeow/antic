import { Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { logged } from "../../helpers/index.js";
import axios from "../../instance/axios";
import { isExpiredState, usersState, userState } from "../../states";

export default () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [isExpired, setIsExpired] = useRecoilState(isExpiredState);

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
