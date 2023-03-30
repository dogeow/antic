import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    "--width": "12px",
  },

  heart: {
    position: "absolute",
    margin: "5px 10px",
    backgroundColor: "pink",
    height: "var(--width)",
    width: "var(--width)",
    transform: "rotate(-45deg)",
    animationName: "$beat",
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },

  "@keyframes beat": {
    "0%": {
      transform: "scale(1) rotate(-45deg)",
    },
    "100%": {
      transform: "scale(0.8) rotate(-45deg)",
    },
  },

  heartAfter: {
    backgroundColor: "pink",
    content: '""',
    borderRadius: "50%",
    position: "absolute",
    width: "var(--width)",
    height: "var(--width)",
    top: "0px",
    left: "6px",
  },

  heartBefore: {
    backgroundColor: "pink",
    content: '""',
    borderRadius: "50%",
    position: "absolute",
    width: "var(--width)",
    height: "var(--width)",
    top: "-6px",
    left: "0px",
  },
});

function Heart() {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.heart}>
        <span className={classes.heartAfter}></span>
        <span className={classes.heartBefore}></span>
      </span>
    </span>
  );
}

export default Heart;
