import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import ClearIcon from "@material-ui/icons/Clear";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import NotListedLocationOutlinedIcon from "@material-ui/icons/NotListedLocationOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { loginAction } from "actions";
import Copyright from "components/site/Copyright";
import wallpaper from "config/wallpaper";
import axios from "instance/axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";

const random = Math.floor(Math.random() * wallpaper.length);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${process.env.REACT_APP_OSS_URL}/wallpaper/${wallpaper[random]})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
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

/**
 *
 * @param {object} props
 * @param {function} props.dispatch
 * @return {JSX.Element}
 * @constructor
 */
const SignInSide = ({ dispatch }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [inputErrors, setInputErrors] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("user/login", {
        account,
        password,
        remember_me: rememberMe,
      })
      .then((response) => {
        dispatch(loginAction(response.data));
        if (state) {
          navigate(state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setInputErrors(error?.data?.errors);
      });
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
          <Grid container justify="center" alignItems="flex-end" spacing={1}>
            <Grid item>
              <Typography component="h1" variant="h5">
                登录
              </Typography>
            </Grid>
            <Grid item>
              <Typography>或</Typography>
            </Grid>
            <Grid item>
              <Typography component="h2" variant="h5">
                <RouteLink to="/register" style={{ color: "#f50057" }}>
                  注册
                </RouteLink>
              </Typography>
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
              placeholder={
                inputErrors && inputErrors.account
                  ? inputErrors.account
                  : "手机号码或 Email 地址"
              }
              InputLabelProps={
                inputErrors && inputErrors.account ? { shrink: true } : {}
              }
              helperText={
                inputErrors && inputErrors.account ? inputErrors.account[0] : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
                endAdornment: account !== "" && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear"
                      onClick={() => setAccount("")}
                      edge="end"
                      tabindex="-1"
                    >
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
              placeholder={
                inputErrors && inputErrors.password
                  ? inputErrors.password
                  : null
              }
              InputLabelProps={
                inputErrors && inputErrors.password ? { shrink: true } : {}
              }
              helperText={
                inputErrors && inputErrors.password
                  ? inputErrors.password[0]
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {displayPassword ? (
                      <VisibilityIcon
                        onClick={handlePassword}
                        className="pointer"
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={handlePassword}
                        className="pointer"
                      />
                    )}
                  </InputAdornment>
                ),
                endAdornment: password !== "" && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear"
                      onClick={() => setPassword("")}
                      edge="end"
                      tabindex="-1"
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
                title="记住我：登录有效期三周，否则一周"
                placement="right"
                enterDelay={200}
                TransitionComponent={Zoom}
                arrow
                interactive={true}
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
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ color: "#f50057" }}
                  onClick={() => {
                    axios.post("user/guest").then(({ data }) => {
                      dispatch(loginAction(data));
                      navigate("/");
                    });
                  }}
                >
                  免密登录测试账号
                </Typography>
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
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

SignInSide.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SignInSide);
