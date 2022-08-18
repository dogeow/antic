import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import zhCNLocale from "dayjs/locale/zh-cn";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";

import themeCustomization from "../config/theme";
import Routes from "../routes";
import { paletteModeState } from "../states";
import ScrollToTop from "./ScrollToTop";

dayjs.locale("zh-cn");

export default () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  useEffect(() => {
    const handle = (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      setPaletteMode(newColorScheme);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handle);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handle);
    };
  }, [setPaletteMode]);

  return (
    <BrowserRouter>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={zhCNLocale}
      >
        <ThemeProvider theme={themeCustomization({ paletteMode })}>
          <ScrollToTop />
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};
