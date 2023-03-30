import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    "--width": "12px",
    position: "relative",
    margin: "5px 10px",
  },

  heart: {
    position: "absolute",
    backgroundColor: "pink",
    height: "var(--width)",
    width: "var(--width)",
    transform: "rotate(-45deg)",
    animationName: "$beat",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    "&::after, &::before": {
      backgroundColor: "pink",
      content: '""',
      borderRadius: "50%",
      position: "absolute",
      width: "var(--width)",
      height: "var(--width)",
    },
    "&::after": {
      top: "0px",
      left: "6px",
    },
    "&::before": {
      top: "-6px",
      left: "0px",
    },
  },

  "@keyframes beat": {
    "0%": {
      transform: "scale(1) rotate(-45deg)",
    },
    "100%": {
      transform: "scale(0.8) rotate(-45deg)",
    },
  },
});

function Heart() {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.heart}></span>
    </span>
  );
}

export default Heart;
