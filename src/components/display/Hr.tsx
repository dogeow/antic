import { Grid } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hr: {
      border: theme.palette.mode === "dark" ? "1px dashed rgba(211,224,233,.15)" : "1px dashed rgba(211,224,233,1)",
    },
  })
);

interface Props {
  style?: React.CSSProperties;
}

export default function Hr(props: Props) {
  const classes = useStyles();

  return <Grid item xs={12} className={classes.hr} style={props.style} />;
}
