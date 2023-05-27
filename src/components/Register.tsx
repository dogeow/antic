import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "../instance/axios";
import ToLogin from "./auth/ToLogin";
import Copyright from "./site/Copyright";

// 定义一个类型来描述错误
interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [inputErrors, setInputErrors] = useState<Errors>({});

  const handle = (e: React.FormEvent) => {
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        注册
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3, width: "100%" }}>
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
              placeholder={inputErrors.name ? inputErrors.name : undefined}
              InputLabelProps={inputErrors.name ? { shrink: true } : {}}
              helperText={inputErrors.name ? inputErrors.name : ""}
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
              placeholder={inputErrors.email ? inputErrors.email : undefined}
              InputLabelProps={inputErrors.email ? { shrink: true } : {}}
              helperText={inputErrors.email ? inputErrors.email[0] : undefined}
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
              placeholder={inputErrors.password ? inputErrors.password : undefined}
              InputLabelProps={inputErrors.password ? { shrink: true } : {}}
              helperText={inputErrors.password ? inputErrors.password[0] : undefined}
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
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handle}>
            注册
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <ToLogin />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
