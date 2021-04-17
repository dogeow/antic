import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";
import md5 from "md5";
import * as React from "react";
import { useStore } from "react-redux";

import { gravatarCdn } from "../config/services";

const User = () => {
  const store = useStore();
  const state = store.getState();
  const avatar = `${gravatarCdn}/${md5(
    state.lab.userEmail
  )}.jpg?d=monsterid&s=300`;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar
          alt={state.lab.user_name}
          src={avatar}
          style={{ width: 150, height: 150 }}
        />
      </Grid>
      <Grid item>
        <div>ID：{state.lab.userId}</div>
        <div>昵称：{state.lab.userName}</div>
        <div>邮箱：{state.lab.userEmail}</div>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <li>User-Agent：{navigator.userAgent}</li>
          <li>
            Token 到期时间：
            {dayjs
              .unix(localStorage.access_token_expired_at)
              .format("YYYY-MM-DD HH:mm:ss")}
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default User;
