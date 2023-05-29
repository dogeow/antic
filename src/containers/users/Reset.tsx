import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import swal from "sweetalert2";

import CustomTextField from "../../components/CustomTextField";
import axios from "../../instance/axios";
import { userState } from "../../states";

const Forget = () => {
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  const [inputErrors, setInputErrors] = useState({});
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { secret } = useParams();

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleReset = (e) => {
    e.preventDefault();

    axios
      .post("/reset", {
        password,
        password_confirmation: passwordConfirmation,
        secret,
      })
      .then(({ data }) => {
        swal.fire({
          title: "重置成功，正在登录",
          icon: "success",
          showCloseButton: true,
        });
        setUser({
          accessToken: data.accessToken,
          id: data.id,
          name: data.name,
          email: data.email,
        });
        navigate("/");
      })
      .catch((error) => {
        setInputErrors(error.data.errors);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "secondary.main",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          重置密码
        </Typography>
        <Box>
          <form
            sx={{
              width: "100%", // Fix IE 11 issue.
              marginTop: 3,
            }}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </form>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ margin: 3 }} onClick={handleReset}>
            修改
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Forget;
