import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Grid, TextField, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "../instance/axios";
import ToLogin from "./Auth/ToLogin";
import Copyright from "./site/Copyright";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handle = (e) => {
    e.preventDefault();
    axios
      .post("user/signup", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((json) => {
        if (json.status === 201) {
          Swal.fire({
            position: "top-end",
            type: "success",
            title: "注册成功，请尝试登录！",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/login");
        } else {
          alert("注册失败！");
        }
      })
      .catch((error) => {
        setInputErrors(error.errors);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="名称"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                error={!!inputErrors.name}
                placeholder={inputErrors.name ? inputErrors.name : null}
                InputLabelProps={inputErrors.name ? { shrink: true } : {}}
                helperText={inputErrors.name ? inputErrors.name[0] : ""}
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
                placeholder={inputErrors.email ? inputErrors.email : null}
                InputLabelProps={inputErrors.email ? { shrink: true } : {}}
                helperText={inputErrors.email ? inputErrors.email[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!inputErrors.password}
                placeholder={inputErrors.password ? inputErrors.password : null}
                InputLabelProps={inputErrors.password ? { shrink: true } : {}}
                helperText={inputErrors.password ? inputErrors.password[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="确认密码"
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handle}
          >
            注册
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <ToLogin />
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
