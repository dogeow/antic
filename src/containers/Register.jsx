import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import * as React, { useState } from "react";
import swal from "sweetalert2";

import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`register-by-${index}`}
      aria-labelledby={`用${index}注册`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `register-${index}`,
    "aria-controls": `register-${index}`,
  };
}

const Register = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("/user/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((resp) => {
        window.console.log(resp);
        if (resp.status === 201) {
          swal.fire({
            title: "注册成功，",
            icon: "success",
            showCloseButton: true,
          });
          history.push("/login");
        } else {
          setInputErrors(resp.data.errors);
        }
      });
  };

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
          注册
        </Typography>
        <div>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="注册类型"
              centered
              variant="fullWidth"
            >
              <Tab label="邮箱" {...a11yProps(0)} icon={<EmailIcon />} />
              <Tab
                label="手机号"
                {...a11yProps(1)}
                icon={<PhoneIphoneIcon />}
                disabled
              />
              <Tab
                label="GitHub"
                {...a11yProps(2)}
                icon={<GitHubIcon />}
                disabled
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="昵称"
                    name="name"
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    error={!!inputErrors.name}
                    placeholder={
                      inputErrors.name ? inputErrors.name[0] : undefined
                    }
                    InputLabelProps={
                      inputErrors.name ? { shrink: true } : undefined
                    }
                    helperText={
                      inputErrors.name ? inputErrors.name[0] : undefined
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email 地址"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!inputErrors.email}
                    placeholder={
                      inputErrors.email ? inputErrors.email[0] : undefined
                    }
                    InputLabelProps={inputErrors.email ? { shrink: true } : {}}
                    helperText={
                      inputErrors.email ? inputErrors.email[0] : undefined
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="密码"
                    type={displayPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!inputErrors.password}
                    placeholder={
                      inputErrors.password ? inputErrors.password[0] : undefined
                    }
                    InputLabelProps={
                      inputErrors.password ? { shrink: true } : {}
                    }
                    helperText={
                      inputErrors.password ? inputErrors.password[0] : undefined
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
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="确认密码"
                    type={displayPassword ? "text" : "password"}
                    id="password_confirmation"
                    autoComplete="current-password-confirmation"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    error={!!inputErrors.password_confirmation}
                    placeholder={
                      inputErrors.password_confirmation
                        ? inputErrors.password_confirmation[0]
                        : undefined
                    }
                    InputLabelProps={
                      inputErrors.password_confirmation ? { shrink: true } : {}
                    }
                    helperText={
                      inputErrors.password_confirmation
                        ? inputErrors.password_confirmation[0]
                        : undefined
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
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleRegister}
              >
                注册
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => {
                      history.push("/login");
                    }}
                    variant="body2"
                    color="secondary"
                  >
                    已经有账户？登录！
                  </Link>
                </Grid>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            手机号
          </TabPanel>
          <TabPanel value={value} index={2}>
            GitHub
          </TabPanel>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
