import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={props.handleRegister}
      >
        注册
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            onClick={() => {
              history.push("/login");
            }}
            variant="body2"
            color="secondary"
          >
            已经有账户？登录！
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
