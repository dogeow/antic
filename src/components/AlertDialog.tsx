import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import * as React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  agree: () => void;
}

/**
 * @param {boolean} open
 * @param {() => void} handleClose
 * @param {string} title
 * @param {string} content
 * @param {() => void} agree
 * @return {JSX.Element}
 */
const AlertDialog: React.FC<Props> = ({ open, handleClose, title, content, agree }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          取消
        </Button>
        <Button color="primary" autoFocus onClick={agree}>
          同意
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
