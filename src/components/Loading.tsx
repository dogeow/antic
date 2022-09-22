import { Backdrop, CircularProgress, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

/**
 * 帏幕
 *
 * @param {object} props
 * @param {bool} props.open
 * @return {JSX.Element}
 * @constructor
 */
export default function SimpleBackdrop(props: { open?: boolean }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props?.open || false}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
