import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { loginAction } from "actions";
import GitHubLogin from "components/GithubLogin";
import Loading from "components/Loading";
import Copyright from "components/site/Copyright";
import Email from "containers/auth/Email";
import LoginOrRegisterButton from "containers/auth/LoginOrRegisterButton";
import Name from "containers/auth/Name";
import Password from "containers/auth/Password";
import PasswordConfirmation from "containers/auth/PasswordConfirmation";
import PhoneNumber from "containers/auth/PhoneNumber";
import Verify from "containers/auth/Verify";
import axios from "instance/axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert2";

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
        .post("/phoneNumberVerify", { phone_number: phoneNumber })
        .then(() => {
          setSentPhone(phoneNumber);
          setSentPhoneSuccess(true);
        });
    }
  }, [phoneNumber, sentPhone]);

  const onSuccess = (response) => {
    setOpen(true);
    axios
      .get("/oauth/github/callback?code=" + response.code)
      .then((response) => {
        dispatch(loginAction(response.data));
        navigate("/");
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
        const addition = tabIndex === 0 ? "，请先验证邮箱后再登录。" : "";
        swal.fire({
          title: "注册成功" + addition,
          icon: "success",
          showCloseButton: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        setInputErrors(error.data.errors);
      });
  };

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Loading open={open} />
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
