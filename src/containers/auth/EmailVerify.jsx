import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import axios from "../../instance/axios";
import { userState } from "../../states";

const Forget = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { secret } = useParams();

  useEffect(() => {
    if (secret) {
      axios.post("/emailVerify", { secret }).then((response) => {
        setIsSuccess(true);
      });
    }
  }, [navigate, secret]);

  const handleAutoLogin = () => {
    axios
      .post("/autoLogin", {
        secret: match.params.secret,
      })
      .then(({ data }) => {
        setUser({
          token: data.access_token,
          userId: data.id,
          userName: data.name,
          userEmail: data.email,
          expiresIn: data.expires_in,
        });
        navigate("/");
      });
  };

  const handleManualLogin = () => {
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      {isSuccess ? (
        <>
          <h2 style={{ color: "green", textAlign: "center" }}>邮箱验证成功</h2>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAutoLogin}
              >
                自动登录
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleManualLogin}
              >
                手动登录
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <h2 style={{ color: "red", textAlign: "center" }}>邮箱验证失败</h2>
      )}
    </Container>
  );
};

export default Forget;
