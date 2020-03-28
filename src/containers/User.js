import React from 'react'
import { useStore } from 'react-redux'
import md5 from 'md5'
import Grid from '@material-ui/core/Grid'

const User = () => {
  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  const store = useStore();
  const state = store.getState();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img alt={state.lab.user_name}
             src={`https://gravatar.loli.net/avatar/${md5(state.lab.user_email)}.jpg?d=mp&s=300`}
             style={{width: '150px'}}/>
      </Grid>
      <Grid item>
        <Grid>ID：{state.lab.user_id}</Grid>
        <Grid>昵称：{state.lab.user_name}</Grid>
        <Grid>邮箱：{state.lab.user_email}</Grid>
        <Grid>个人签名：很懒，还没有签名</Grid>
        <Grid>注册时间：</Grid>
      </Grid>
    </Grid>
  );
};

export default User;
