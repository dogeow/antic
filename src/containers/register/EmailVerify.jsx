import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { loginAction } from "../../actions";
import axios from "../../instance/axios";

const Forget = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (match.params.secret) {
      axios
        .post("/emailVerify", {
          secret: match.params.secret,
        })
        .then((response) => {
          setIsSuccess(true);
        });
    }
  }, [history, match.params.secret]);

  const handleAutoLogin = () => {
    axios
      .post("/autoLogin", {
        secret: match.params.secret,
      })
      .then((response) => {
        dispatch(loginAction(response.data));
        history.push("/");
      });
  };

  const handleManualLogin = () => {
    history.push("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      {isSuccess ? (
        <>
          <h2 style={{ color: "green", textAlign: "center" }}>验证成功</h2>
          <Grid container spacing={2} justify="space-around">
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
        <h2 style={{ color: "red", textAlign: "center" }}>验证失败</h2>
      )}
    </Container>
  );
};

export default Forget;
