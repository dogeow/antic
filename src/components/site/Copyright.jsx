import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

const Copyright = () => (
  <Typography variant="body1" color="textSecondary" align="center">
    {"Copyright © "}
    <Link to="/">{import.meta.env.VITE_NAME}</Link> {new Date().getFullYear()}.
  </Typography>
);

export default Copyright;
