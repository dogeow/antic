import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Switch } from "@mui/material";
import * as React from "react";
import { useRecoilState } from "recoil";

import { exitFullscreen, fullscreen } from "../helpers/browser";
import { isSettingsOpenState, paletteModeState } from "../states";

const Settings = () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [settingsOpen, setSettingsOpen] = useRecoilState(isSettingsOpenState);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <Dialog
      onClose={() => {
        setSettingsOpen(false);
      }}
      aria-labelledby="simple-dialog"
      open={settingsOpen}
    >
      <DialogTitle id="simple-dialog-title">网站设置</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={paletteMode === "dark"}
                onClick={() => {
                  setPaletteMode(paletteMode === "light" ? "dark" : "light");
                  document.documentElement.setAttribute(
                    "data-prefers-color-scheme",
                    paletteMode === "light" ? "dark" : "light"
                  );
                }}
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
