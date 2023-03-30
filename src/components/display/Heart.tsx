import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  heart: {
    position: "relative",
    margin: "5px 10px",
    height: "12px",
    width: "12px",
    transform: "rotate(-45deg)",
    animation: "$beat 1s infinite",
    "&::before, &::after": {
      content: '""',
      backgroundColor: "pink",
      borderRadius: "50%",
      position: "absolute",
      height: "12px",
      width: "12px",
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

  return <span className={classes.heart}></span>;
}

export default Heart;
