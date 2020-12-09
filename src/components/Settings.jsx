import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";

const Settings = (props) => {
  function handleClose() {
    props.onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">网站设置</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={props.paletteMode === "dark"}
                onClick={props.onThemeClick}
                value="paletteMode"
                inputProps={{ "aria-label": "黑夜模式" }}
              />
            }
            label="黑夜模式"
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
