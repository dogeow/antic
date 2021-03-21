import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import React, { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useDispatch } from "react-redux";
import swal from "sweetalert2";

import { loginAction } from "../actions";
import Copyright from "../components/Copyright";
import GitHubLogin from "../components/GithubLogin";
import Loading from "../components/Loading";
import axios from "../instance/axios";
import GoogleRecaptcha from "./Recaptcha";
import Email from "./register/Email";
import LoginOrRegisterButton from "./register/LoginOrRegisterButton";
import Name from "./register/Name";
import Password from "./register/Password";
import PasswordConfirmation from "./register/PasswordConfirmation";
import PhoneNumber from "./register/PhoneNumber";
import Verify from "./register/Verify";

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `register-tab-${index}`,
    "aria-controls": `register-tabpanel-${index}`,
  };
}

const Register = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const [open, setOpen] = useState(false);

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

  const onSuccess = (response) => {
    setOpen(true);
    axios
      .get("/oauth/github/callback?code=" + response.code)
      .then((response) => {
        dispatch(loginAction(response.data));
        history.push("/");
        setOpen(false);
      });
  };

  const onFailure = (response) => console.error(response);

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
        const addition = tabIndex === 0 && "，请先验证邮箱后再登录。";
        swal.fire({
          title: "注册成功" + addition,
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
      <Loading open={open} />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA}
        useRecaptchaNet
        scriptProps={{ async: true, defer: true, appendTo: "body" }}
      >
        <GoogleRecaptcha onSaveToken={saveToken} />
      </GoogleReCaptchaProvider>
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
              <Tab label="GitHub" {...a11yProps(2)} icon={<GitHubIcon />} />
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
                  <Email
                    email={email}
                    setEmail={setEmail}
                    error={inputErrors?.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Password
                    password={password}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPassword={setPassword}
                    error={inputErrors?.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordConfirmation
                    passwordConfirmation={passwordConfirmation}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPasswordConfirmation={setPasswordConfirmation}
                    error={inputErrors?.password_confirmation}
                  />
                </Grid>
              </Grid>
              <LoginOrRegisterButton handleRegister={handleRegister} />
            </form>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
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
                  <PhoneNumber
                    phoneNumber={phoneNumber}
                    sentPhoneSuccess={sentPhoneSuccess}
                    setPhoneNumber={setPhoneNumber}
                    error={inputErrors?.phone_number}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Verify
                    verify={verify}
                    setVerify={setVerify}
                    error={inputErrors?.verify}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Password
                    password={password}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPassword={setPassword}
                    error={inputErrors?.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordConfirmation
                    passwordConfirmation={passwordConfirmation}
                    displayPassword={displayPassword}
                    handlePassword={handlePassword}
                    setPasswordConfirmation={setPasswordConfirmation}
                    error={inputErrors?.password_confirmation}
                  />
                </Grid>
              </Grid>
              <LoginOrRegisterButton handleRegister={handleRegister} />
            </form>
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <GitHubLogin
              clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
              redirectUri=""
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
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
