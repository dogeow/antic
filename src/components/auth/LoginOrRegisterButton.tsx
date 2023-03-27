import { Button, Grid, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

import ToLogin from "../../components/auth/ToLogin";

const useStyles = makeStyles((theme: Theme) => ({
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
      <Grid container justifyContent="flex-end">
        <Grid item>
          <ToLogin />
        </Grid>
      </Grid>
    </>
  );
};
