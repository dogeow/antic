import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link to="/">{process.env.REACT_APP_NAME}</Link> {new Date().getFullYear()}.
  </Typography>
);

export default Copyright;
