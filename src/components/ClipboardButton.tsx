import FileCopyIcon from "@mui/icons-material/FileCopy";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ClipboardButton = (props: { text: any; handleClick: () => any }) => (
  <CopyToClipboard text={props.text} onCopy={() => props.handleClick()}>
    <IconButton size="small">
      <FileCopyIcon fontSize="inherit" />
    </IconButton>
  </CopyToClipboard>
);

export default ClipboardButton;
