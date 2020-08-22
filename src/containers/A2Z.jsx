import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "2em",
    width: 300,
    margin: "0 auto",
  },
});

const A2Z = () => {
  const classes = useStyles();
  return (
    <pre className={classes.root}>
      {`Aa Bb Cc Dd Ee Ff Gg
Hh Ii Jj Kk Ll Mm Nn
Oo Pp Qq Rr Ss Tt
Uu Vv Ww Xx Yy Zz`}
    </pre>
  );
};

export default A2Z;
