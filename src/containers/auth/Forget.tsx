import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Avatar, Button, Container, InputAdornment, TextField, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import swal from "sweetalert2";

import axios from "../../instance/axios";

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
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handleForget = (e) => {
    e.preventDefault();

    axios
      .post("/forget", { account })
      .then(() => {
        swal.fire({
          title: "成功发送，请访问链接重置密码",
          icon: "success",
          showCloseButton: true,
        });
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
          忘记密码
        </Typography>
        <div>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
              autoComplete="account"
              autoFocus
              onChange={(e) => setAccount(e.target.value)}
              error={inputErrors && inputErrors.account}
              placeholder="手机号码或 Email 地址"
              InputLabelProps={inputErrors && inputErrors.account ? { shrink: true } : {}}
              helperText={inputErrors && inputErrors.account ? inputErrors.account[0] : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleForget}
          >
            发送重置密码的链接
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Forget;
