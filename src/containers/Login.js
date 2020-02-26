import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Copyright from '../components/Copyright'
import { loginAction } from '../actions'
import { connect } from 'react-redux'
import { logged } from '../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${process.env.REACT_APP_API_URL}random)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = ({dispatch}) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember_me, setRemember_me] = useState(false);
  const [inputErrors, setInputErrors] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    axios.post("user/login", {
      email: email,
      password: password,
      remember_me: remember_me
    }).then(response => {
      let {access_token} = response.data;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      logged(access_token);
      axios.post("user/profile").then(response2 => {
        console.log(response2);
        let {id, name, email} = response2.data.user;
        dispatch(loginAction(access_token, id, name, email));
      });
      history.push('/');
    }).catch(error => {
      console.log(error);
      setInputErrors(error.errors);
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            登录
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email 地址"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              error={inputErrors && inputErrors.email}
              placeholder={inputErrors && inputErrors.email ? inputErrors.email : null}
              InputLabelProps={
                inputErrors && inputErrors.email ? {shrink: true} : {}
              }
              helperText={inputErrors && inputErrors.email ? inputErrors.email[0] : ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={inputErrors && inputErrors.password}
              placeholder={inputErrors && inputErrors.password ? inputErrors.password : null}
              InputLabelProps={
                inputErrors && inputErrors.password ? {shrink: true} : {}
              }
              helperText={inputErrors && inputErrors.password ? inputErrors.password[0] : ''}
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={remember_me}/>}
              label="记住我"
              onChange={() => setRemember_me(!remember_me)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handle}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码？
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => {
                  history.push('/register')
                }} variant="body2">
                  {"没有账户？注册！"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default connect()(SignInSide);
