import { Button, Grid } from "@mui/material";
import * as React from "react";

import ToLogin from "../../components/auth/ToLogin";

interface Props {
  handleRegister: () => void;
}

const MyComponent: React.FC<Props> = ({ handleRegister }) => {
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleRegister}
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

export default MyComponent;
