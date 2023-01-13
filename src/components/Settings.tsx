import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Switch } from "@mui/material";
import * as React from "react";

import { exitFullscreen, fullscreen } from "../helpers/browser";

const Settings = (props) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  function handleClose() {
    props.onClose();
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog" open={props.open}>
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
          <FormControlLabel
            control={
              <Switch
                checked={isFullscreen}
                onClick={
                  isFullscreen
                    ? () => {
                        exitFullscreen();
                        setIsFullscreen(false);
                      }
                    : () => {
                        fullscreen();
                        setIsFullscreen(true);
                      }
                }
                value="fullscreen"
                inputProps={{ "aria-label": "全屏模式" }}
              />
            }
            label="全屏模式"
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
