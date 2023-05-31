import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AppBar, Avatar, Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import swal from "sweetalert2";

import LoginOrRegisterButton from "../../components/auth/LoginOrRegisterButton";
import PhoneNumber from "../../components/auth/PhoneNumber";
import Verify from "../../components/auth/Verify";
import CustomTextField from "../../components/CustomTextField";
import Loading from "../../components/display/Loading";
import GitHubLogin from "../../components/GithubLogin";
import Copyright from "../../components/site/Copyright";
import axios from "../../instance/axios";
import { userState } from "../../states";

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

const Register = () => {
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
  const [, setUser] = useRecoilState(userState);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (phoneNumber.length === 11 && sentPhone !== phoneNumber) {
      setSentPhoneSuccess(false);
      axios.post("/phoneNumberVerify", { phone_number: phoneNumber }).then(() => {
        setSentPhone(phoneNumber);
        setSentPhoneSuccess(true);
      });
    }
  }, [phoneNumber, sentPhone]);

  const onSuccess = (response) => {
    setOpen(true);
    axios.get("/oauth/github/callback?code=" + response.code).then((response) => {
      const data = response.data;
      setUser({
        accessToken: data.accessToken,
        id: data.id,
        name: data.name,
        email: data.email,
      });
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

  const PasswordField = () => (
    <CustomTextField
      id={"password"}
      type={displayPassword ? "text" : "password"}
      label={"密码"}
      value={password}
      placeholder={"8个字符以上"}
      onChange={setPassword}
      error={inputErrors?.password}
      icon={
        displayPassword ? (
          <VisibilityIcon onClick={handlePassword} className="pointer" />
        ) : (
          <VisibilityOffIcon onClick={handlePassword} className="pointer" />
        )
      }
    />
  );

  const PasswordConfirmationField = () => (
    <CustomTextField
      id={"password_confirmation"}
      type={displayPassword ? "text" : "password"}
      label={"确认密码"}
      value={passwordConfirmation}
      placeholder={""}
      onChange={setPasswordConfirmation}
      error={inputErrors?.password_confirmation}
      icon={
        displayPassword ? (
          <VisibilityIcon onClick={handlePassword} className="pointer" />
        ) : (
          <VisibilityOffIcon onClick={handlePassword} className="pointer" />
        )
      }
    />
  );

  const NameField = () => (
    <CustomTextField
      id={"name"}
      label={"昵称"}
      value={name}
      placeholder={"4-16个字符（一个中文为 2 个字符）"}
      onChange={setName}
      error={inputErrors?.name}
      icon={<AccountCircle />}
    />
  );

  return (
    <Container component="main" maxWidth="xs">
      <Loading open={open} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          注册
        </Typography>
        <div>
          <AppBar position="static">
            <Tabs value={tabIndex} onChange={handleChange} aria-label="注册类型" centered variant="fullWidth">
              <Tab label="邮箱" {...a11yProps(0)} icon={<EmailIcon />} />
              <Tab label="手机号" {...a11yProps(1)} icon={<PhoneIphoneIcon />} />
              <Tab label="GitHub" {...a11yProps(2)} icon={<GitHubIcon />} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            <form style={{ width: "100%", marginTop: 3 }} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <NameField />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    id={"email"}
                    label={"邮箱"}
                    value={email}
                    placeholder={"username@example.com"}
                    onChange={setEmail}
                    error={inputErrors?.email}
                    icon={<MailOutlineIcon />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField />
                </Grid>
                <Grid item xs={12}>
                  <PasswordConfirmationField />
                </Grid>
              </Grid>
              <LoginOrRegisterButton handleRegister={handleRegister} />
            </form>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <form style={{ width: "100%", marginTop: 3 }} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <NameField />
                </Grid>
                <Grid item xs={12}>
                  <PhoneNumber
                    phoneNumber={phoneNumber}
                    sentPhoneSuccess={sentPhoneSuccess}
                    setPhoneNumber={setPhoneNumber}
                    inputErrors={inputErrors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Verify verify={verify} setVerify={setVerify} error={inputErrors?.verify} />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField />
                </Grid>
                <Grid item xs={12}>
                  <PasswordConfirmationField />
                </Grid>
              </Grid>
              <LoginOrRegisterButton handleRegister={handleRegister} />
            </form>
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <GitHubLogin
              clientId={import.meta.env.VITE_GITHUB_CLIENT_ID}
              redirectUri=""
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          </TabPanel>
        </div>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
