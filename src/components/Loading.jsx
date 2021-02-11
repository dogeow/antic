import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
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
