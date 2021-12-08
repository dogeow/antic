import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

/**
 *
 * @param {boolean} open
 * @param {function} handleClose
 * @param {string} title
 * @param {string} content
 * @param {function}agree
 * @return {JSX.Element}
 * @constructor
 */
export default function AlertDialog({
  open,
  handleClose,
  title,
  content,
  agree,
}) {
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
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  agree: PropTypes.func.isRequired,
};
