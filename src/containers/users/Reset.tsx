import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Avatar, Button, Container, Grid, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import swal from "sweetalert2";

import CustomTextField from "../../components/CustomTextField";
import axios from "../../instance/axios";
import { userState } from "../../states";

const useStyles = makeStyles((theme: Theme) => ({
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

const Forget = () => {
  const navigate = useNavigate();
  const classes = useStyles();
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
          重置密码
        </Typography>
        <div>
          <form className={classes.form} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleReset}
          >
            修改
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Forget;
