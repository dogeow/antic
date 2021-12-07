import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

export default function Title({ children }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.element.isRequired,
};
