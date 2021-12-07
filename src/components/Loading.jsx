import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

/**
 * 帏幕
 * @param {object} props
 * @param {bool} props.open
 * @return {JSX.Element}
 * @constructor
 */
export default function SimpleBackdrop(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={props.open !== undefined ? props.open : true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
