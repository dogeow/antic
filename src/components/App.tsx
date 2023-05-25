import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import zhCNLocale from "dayjs/locale/zh-cn";
import React, { useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";

import themeCustomization from "../config/theme";
import Routes from "../routes";
import initializeEcho from "../services/echo";
import { paletteModeState, userState } from "../states";
import ScrollToTop from "./display/ScrollToTop";

dayjs.locale("zh-cn");

const changeVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [user] = useRecoilState(userState);

  // 手机浏览器的高度问题（搜索可以找到相配合的地方）
  const handleResize = useCallback(() => {
    changeVh();
  }, []);

  // 网站主题跟随电脑系统主题
  const handleColorSchemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? "dark" : "light";
      setPaletteMode(newColorScheme);
      document.documentElement.setAttribute("data-prefers-color-scheme", paletteMode);
    },
    [paletteMode, setPaletteMode]
  );

  useEffect(() => {
    changeVh();
    window.addEventListener("resize", handleResize);

    initializeEcho();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleColorSchemeChange);

    return () => {
      window.removeEventListener("resize", handleResize, false);
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleColorSchemeChange);
    };
  }, [user.accessToken, handleResize, handleColorSchemeChange]);

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={zhCNLocale}>
        <ThemeProvider theme={themeCustomization({ paletteMode })}>
          <CssBaseline />
          <ScrollToTop />
          <Routes />
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};
