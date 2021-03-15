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
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import SmsIcon from "@material-ui/icons/Sms";
import React, { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import swal from "sweetalert2";

import Copyright from "../components/Copyright";
import axios from "../instance/axios";
import GoogleRecaptcha from "./Recaptcha";
import Name from "./register/Name";
import Password from "./register/Password";
import PasswordConfirmation from "./register/PasswordConfirmation";

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
      id={`register-tabpanel-${index}`}
      aria-labelledby={`register-tab-${index}`}
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
    id: `register-tab-${index}`,
    "aria-controls": `register-tabpanel-${index}`,
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
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
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
  }, [phoneNumber, sentPhone, token]);

  const handleRegister = (e) => {
    e.preventDefault();

    let url;

    const credentials = {
      name,
      password,
      password_confirmation: passwordConfirmation,
    };

    if (tabIndex === 0) {
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
              value={tabIndex}
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
          <TabPanel value={tabIndex} index={0}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Name
                    name={name}
                    onSetName={setName}
                    error={inputErrors?.name}
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
                    error={!!inputErrors?.email}
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
                  <Password
                    password={password}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPassword={setPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordConfirmation
                    passwordConfirmation={passwordConfirmation}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPasswordConfirmation={setPasswordConfirmation}
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
          <TabPanel value={tabIndex} index={1}>
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.REACT_APP_RECAPTCHA}
              useRecaptchaNet
              scriptProps={{ async: true, defer: true, appendTo: "body" }}
            >
              {token === "" && sentPhone === "" && (
                <GoogleRecaptcha onSaveToken={saveToken} />
              )}
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Name
                      name={name}
                      onSetName={setName}
                      error={inputErrors?.name}
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
                        error={!!inputErrors?.phone_number}
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
                      error={!!inputErrors?.verify}
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
                    <Password
                      password={password}
                      displayPassword={displayPassword}
                      handlePassword={handlePassword}
                      setPassword={setPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordConfirmation
                      passwordConfirmation={passwordConfirmation}
                      displayPassword={displayPassword}
                      handlePassword={handlePassword}
                      setPasswordConfirmation={setPasswordConfirmation}
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
            </GoogleReCaptchaProvider>
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
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
