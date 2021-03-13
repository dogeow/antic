import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import SmsIcon from "@material-ui/icons/Sms";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import swal from "sweetalert2";

import Copyright from "../components/Copyright";
import axios from "../instance/axios";
import GoogleRecaptcha from "./Recaptcha";

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

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& p": {
      color: "green",
    },
  },
})(TextField);

const Register = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [sentPhone, setSentPhone] = useState("");
  const [sentPhoneSuccess, setSentPhoneSuccess] = useState(false);
  const [verify, setVerify] = useState("");
  const [email, setEmail] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (phoneNumber.length === 11 && sentPhone !== phoneNumber) {
      setSentPhoneSuccess(false);
      axios
        .post("/recaptcha", { token, phone_number: phoneNumber })
        .then(() => {
          setSentPhone(phoneNumber);
          setSentPhoneSuccess(true);
        });
    }
  }, [phoneNumber]);

  const handleRegister = (e) => {
    e.preventDefault();

    let url;

    const credentials = {
      name,
      password,
      password_confirmation: passwordConfirmation,
    };

    if (value === 0) {
      url = "/user/register-by-email";
      credentials.email = email;
    } else {
      url = "/user/register-by-phone";
      credentials.phone_number = phoneNumber;
      credentials.verify = verify;
    }

    axios
      .post(url, credentials)
      .then(() => {
        swal.fire({
          title: "注册成功，",
          icon: "success",
          showCloseButton: true,
        });
        history.push("/login");
      })
      .catch((error) => {
        setInputErrors(error.data.errors);
      });
  };

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const saveToken = (token) => {
    setToken(token);
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA}
      useRecaptchaNet
      scriptProps={{ async: true, defer: true, appendTo: "body" }}
    >
      {value === 1 && token === "" && sentPhone === "" && (
        <GoogleRecaptcha onSaveToken={saveToken} />
      )}
      <Container component="main" maxWidth="xs">
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
                      placeholder={inputErrors?.name?.[0]}
                      InputLabelProps={inputErrors?.name && { shrink: true }}
                      helperText={inputErrors?.name?.[0]}
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
                      placeholder={inputErrors?.email?.[0]}
                      InputLabelProps={inputErrors?.email && { shrink: true }}
                      helperText={inputErrors?.email?.[0]}
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
                      placeholder={inputErrors?.password?.[0]}
                      InputLabelProps={
                        inputErrors?.password && { shrink: true }
                      }
                      helperText={inputErrors?.password?.[0]}
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
                      fullWidth
                      name="password_confirmation"
                      label="确认密码"
                      type={displayPassword ? "text" : "password"}
                      id="password_confirmation"
                      autoComplete="current-password-confirmation"
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      error={!!inputErrors.password_confirmation}
                      placeholder={inputErrors?.password_confirmation?.[0]}
                      InputLabelProps={
                        inputErrors?.password_confirmation && { shrink: true }
                      }
                      helperText={inputErrors?.password_confirmation?.[0]}
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
                      placeholder={inputErrors?.name?.[0]}
                      InputLabelProps={inputErrors?.name && { shrink: true }}
                      helperText={inputErrors?.name?.[0]}
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
                    {phoneNumber.length === 11 && sentPhoneSuccess ? (
                      <ValidationTextField
                        variant="outlined"
                        required
                        fullWidth
                        id="phone_number"
                        label="手机号码"
                        name="phone_number"
                        value={phoneNumber}
                        autoComplete="phone_number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={inputErrors?.phone_number?.[0]}
                        InputLabelProps={
                          inputErrors?.phone_number && { shrink: true }
                        }
                        helperText={"已发送验证码，五分钟内有效"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIphoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="phone_number"
                        label="手机号码"
                        name="phone_number"
                        value={phoneNumber}
                        autoComplete="phone_number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error={!!inputErrors.phone_number}
                        placeholder={inputErrors?.phone_number?.[0]}
                        InputLabelProps={
                          inputErrors?.phone_number && { shrink: true }
                        }
                        helperText={inputErrors?.phone_number?.[0]}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIphoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="verify"
                      label="验证码"
                      type={displayPassword ? "text" : "password"}
                      id="verify"
                      autoComplete="current-verify"
                      onChange={(e) => setVerify(e.target.value)}
                      error={!!inputErrors.verify}
                      placeholder={inputErrors?.verify?.[0]}
                      InputLabelProps={inputErrors?.verify && { shrink: true }}
                      helperText={inputErrors?.verify?.[0]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SmsIcon className="pointer" />
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
                      placeholder={inputErrors?.password?.[0]}
                      InputLabelProps={
                        inputErrors?.password && { shrink: true }
                      }
                      helperText={inputErrors?.password?.[0]}
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
                      fullWidth
                      name="password_confirmation"
                      label="确认密码"
                      type={displayPassword ? "text" : "password"}
                      id="password_confirmation"
                      autoComplete="current-password-confirmation"
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      error={!!inputErrors.password_confirmation}
                      placeholder={inputErrors?.password_confirmation?.[0]}
                      InputLabelProps={
                        inputErrors?.password_confirmation && { shrink: true }
                      }
                      helperText={inputErrors?.password_confirmation?.[0]}
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
            <TabPanel value={value} index={2}>
              GitHub
            </TabPanel>
          </div>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </GoogleReCaptchaProvider>
  );
};

export default Register;
