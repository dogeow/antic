import "dayjs/locale/zh-cn";

import AdapterDayjs from "@mui/lab/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";

import themeCustomization from "../config/theme";
import Routes from "../routes";
import { paletteModeState } from "../states";
import ScrollToTop from "./ScrollToTop";

dayjs.locale("zh-cn");

export default () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="zh-cn">
        <ThemeProvider theme={themeCustomization({ paletteMode })}>
          <ScrollToTop />
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};
