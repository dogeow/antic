import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import { getGravatarAddress } from "../../helpers";
import { userState } from "../../states";

const User = () => {
  const [user] = useRecoilState(userState);
  const avatar = getGravatarAddress(user.email, 300);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar alt={user.name} src={avatar} style={{ width: 150, height: 150 }} />
      </Grid>
      <Grid item>
        <div>ID：{user.id}</div>
        <div>昵称：{user.name}</div>
        <div>邮箱：{user.email}</div>
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
