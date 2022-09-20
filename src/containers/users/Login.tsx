import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Copyright from "../../components/site/Copyright";
import config from "../../config/index.json";
import { OSS_URL } from "../../config/services";
import { logged } from "../../helpers";
import axios from "../../instance/axios";
import { isExpiredState, usersState, userState } from "../../states";
import LoginGuest from "../auth/LoginGuest";

const random = Math.floor(Math.random() * config.wallpaper.length);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${OSS_URL}/wallpaper/${config.wallpaper[random]})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    caretColor: "blue",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const classes = useStyles();
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [isExpired, setIsExpired] = useRecoilState(isExpiredState);
  const [account, setAccount] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [inputErrors, setInputErrors] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const login = async () => {
      const csrf = await axios.get("sanctum/csrf-cookie");
      if (csrf.status !== 204) {
        return;
      }

      const post = await axios.post("user/login", {
        account,
        password,
        remember_me: rememberMe,
      });
      if (post.status !== 201) {
        setInputErrors(post?.data?.errors);
        return;
      }

      const data = await post.data;
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
    };

    login();
  };

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Grid container justifyContent="center" alignItems="flex-end" spacing={1}>
            <Grid item>
              <Typography component="h1" variant="h5">
                登录
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ color: "#f50057" }}>或</Typography>
            </Grid>
            <Grid item>
              <RouteLink to="/register" style={{ color: "#f50057" }}>
                <Typography>注册</Typography>
              </RouteLink>
            </Grid>
          </Grid>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              value={account}
              autoComplete="account"
              autoFocus
              onChange={(e) => setAccount(e.target.value)}
              error={inputErrors && inputErrors.account}
              placeholder={inputErrors && inputErrors.account ? inputErrors.account : "手机号码或 Email 地址"}
              InputLabelProps={inputErrors && inputErrors.account ? { shrink: true } : {}}
              helperText={inputErrors && inputErrors.account ? inputErrors.account[0] : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
                endAdornment: account !== "" && (
                  <InputAdornment position="end">
                    <IconButton aria-label="Clear" onClick={() => setAccount("")} edge="end" tabIndex={-1} size="large">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="密码"
              type={displayPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={inputErrors && inputErrors.password}
              placeholder={inputErrors && inputErrors.password ? inputErrors.password : null}
              InputLabelProps={inputErrors && inputErrors.password ? { shrink: true } : {}}
              helperText={inputErrors && inputErrors.password ? inputErrors.password[0] : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {displayPassword ? (
                      <VisibilityIcon onClick={handlePassword} className="pointer" />
                    ) : (
                      <VisibilityOffIcon onClick={handlePassword} className="pointer" />
                    )}
                  </InputAdornment>
                ),
                endAdornment: password !== "" && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear"
                      onClick={() => setPassword("")}
                      edge="end"
                      tabIndex="-1"
                      size="large"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ display: "flex" }}>
              <FormControlLabel
                style={{ marginRight: 0 }}
                control={<Checkbox color="primary" checked={rememberMe} />}
                label="记住我"
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Tooltip
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                title="记住我：登录有效期永远，否则一个月"
                placement="right"
                enterDelay={200}
                TransitionComponent={Zoom}
                arrow
                style={{ alignSelf: "center" }}
                onClick={handleOpen}
              >
                <NotListedLocationOutlinedIcon />
              </Tooltip>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              登录
            </Button>
          </form>
          <Grid container justifyContent="space-between" style={{ marginTop: 24 }}>
            <Grid item>
              <LoginGuest />
            </Grid>
            <Grid item>
              <RouteLink to="/forget">
                <Typography variant="body2">忘记密码？</Typography>
              </RouteLink>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
