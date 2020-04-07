import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const UserSetting = () => {
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const handleChangePassword = () => {
    axios.put('user/password', {
      currPassword,
      newPassword,
      newPasswordConfirmation,
    }).then(({data}) => {
        console.log(data);
      },
    );
  };

  return (
    <div>
      <h2>用户设置</h2>
      <h3>修改密码</h3>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="当前密码"
            value={currPassword}
            onChange={e => setCurrPassword(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="新密码"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="确认新密码"
            value={newPasswordConfirmation}
            onChange={e => setNewPasswordConfirmation(e.target.value)}/>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleChangePassword}>确定</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserSetting;