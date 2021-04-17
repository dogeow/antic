import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";
import md5 from "md5";
import * as React from "react";
import { useSelector } from "react-redux";

import { gravatarCdn } from "../config/services";

const User = () => {
  const lab = useSelector((state) => state.lab);
  const avatar = `${gravatarCdn}/${md5(lab.userEmail)}.jpg?d=monsterid&s=300`;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar
          alt={lab.user_name}
          src={avatar}
          style={{ width: 150, height: 150 }}
        />
      </Grid>
      <Grid item>
        <div>ID：{lab.userId}</div>
        <div>昵称：{lab.userName}</div>
        <div>邮箱：{lab.userEmail}</div>
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
