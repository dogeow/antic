import "dayjs/locale/zh-cn";

import AdapterDayjs from "@mui/lab/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import themeCustomization from "config/theme";
import dayjs from "dayjs";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";

import ScrollToTop from "./ScrollToTop";

dayjs.locale("zh-cn");

export default () => {
  const paletteMode = useSelector((state) => state.lab.paletteMode);

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
