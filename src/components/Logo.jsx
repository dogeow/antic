import Avatar from "@mui/material/Avatar";
import * as React from "react";

export default ({ shadow = false }) => (
  <Avatar
    alt="Doge"
    src="/logo80.png"
    style={
      shadow ? { filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)" } : null
    }
  />
);
