import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  hr: {
    border:
      theme.palette.mode === "dark"
        ? "1px dashed rgba(211,224,233,.15)"
        : "1px dashed rgba(211,224,233,1)",
  },
}));

export default function Hr() {
  const classes = useStyles();

  return <Grid item xs={12} className={classes.hr} />;
}
