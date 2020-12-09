import Grid from "@material-ui/core/Grid";
import md5 from "md5";
import moment from "moment";
import React from "react";
import { useStore } from "react-redux";

const User = () => {
  const store = useStore();
  const state = store.getState();
  const avatar = `https://cn.gravatar.com/avatar/${md5(
    state.lab.user_email
  )}.jpg?d=mp&s=300`;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <div className="box">
          <img
            alt={state.lab.user_name}
            src={avatar}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      </Grid>
      <Grid item>
        <Grid>ID：{state.lab.userId}</Grid>
        <Grid>昵称：{state.lab.user_name}</Grid>
        <Grid>邮箱：{state.lab.user_email}</Grid>
      </Grid>
      <Grid item xs={12}>
        修改密码
      </Grid>
      <Grid item xs={12}>
        <ul>
          <li>User-Agent：{navigator.userAgent}</li>
          <li>
            Token 到期时间：
            {moment
              .unix(localStorage.access_token_expired_at)
              .format("YYYY-MM-DD HH:mm:ss")}
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default User;
