import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";
import { Md5 } from "ts-md5";

import { gravatarCdn } from "../../config/services.js";
import { userState } from "../../states/index.js";

const User = () => {
  const [user, setUser] = useRecoilState(userState);
  const avatar = `${gravatarCdn}/${Md5.hashStr(user.userEmail)}.jpg?d=monsterid&s=300`;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar alt={user.userName} src={avatar} style={{ width: 150, height: 150 }} />
      </Grid>
      <Grid item>
        <div>ID：{user.userId}</div>
        <div>昵称：{user.userName}</div>
        <div>邮箱：{user.userEmail}</div>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <li>User-Agent：{navigator.userAgent}</li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default User;
