import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

/**
 * 帏幕
 *
 * @param {object} props
 * @param {bool} props.open
 * @return {JSX.Element}
 * @constructor
 */
export default function SimpleBackdrop({ open = false }: { open?: boolean }): React.ReactElement {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
