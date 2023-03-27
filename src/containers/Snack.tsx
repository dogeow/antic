import { Alert as MuiAlert, Snackbar } from "@mui/material";
import React, { forwardRef } from "react";
import { useRecoilState } from "recoil";

import { isSnackOpenState, severityState, snackMessageState } from "../states";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = () => {
  const [snackMessage] = useRecoilState(snackMessageState);
  const [severity] = useRecoilState(severityState);
  const [isSnackOpen, setIsSnackOpen] = useRecoilState(isSnackOpenState);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isSnackOpen}
      autoHideDuration={2000}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        setIsSnackOpen(!isSnackOpen);
      }}
    >
      <Alert
        severity={severity}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          setIsSnackOpen(!isSnackOpen);
        }}
      >
        {snackMessage}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
