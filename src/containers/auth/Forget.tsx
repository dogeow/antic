import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Avatar, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import swal from "sweetalert2";

import axios from "../../instance/axios";

interface InputErrors {
  account?: string[];
}

const Forget: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const handleForget = (e: React.FormEvent) => {
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
      <div
        style={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            bgcolor: "secondary.main",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          忘记密码
        </Typography>
        <div>
          <form
            style={{
              width: "100%", // Fix IE 11 issue.
              marginTop: 3,
            }}
            noValidate
          >
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
              error={Boolean(inputErrors?.account)}
              placeholder="手机号码或 Email 地址"
              InputLabelProps={Boolean(inputErrors?.account) ? { shrink: true } : {}}
              helperText={inputErrors?.account ? inputErrors.account[0] : ""}
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
            sx={{ margin: "3 0 2" }}
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
