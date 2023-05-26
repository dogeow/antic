import { Button, Grid } from "@mui/material";
import * as React from "react";

import ToLogin from "../../components/auth/ToLogin";

export default (props) => {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
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
