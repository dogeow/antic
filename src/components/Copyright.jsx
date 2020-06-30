import { Link } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link to="/">{process.env.REACT_APP_NAME}</Link> {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;
