import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import zhCNLocale from "dayjs/locale/zh-cn";
import Echo from "laravel-echo";
import React, { useEffect } from "react";
import { isMobile as isMobileHandle } from "react-device-detect";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";

import themeCustomization from "../config/theme";
import axios from "../instance/axios";
import Routes from "../routes";
import { isMobileState, paletteModeState, userState } from "../states";
import ScrollToTop from "./ScrollToTop";

dayjs.locale("zh-cn");

export default () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: import.meta.env.VITE_PUSHER_PORT,
      wssPort: import.meta.env.VITE_PUSHER_PORT,
      forceTLS: false,
      encrypted: true,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      authorizer: (channel, options) => {
        return {
          authorize: localStorage.getItem("token")
            ? (socketId, callback) => {
                axios
                  .post("/broadcasting/auth", {
                    socket_id: socketId,
                    channel_name: channel.name,
                  })
                  .then((response) => {
                    callback(false, response.data);
                  })
                  .catch((error) => {
                    callback(true, error);
                  });
              }
            : () => {},
        };
      },
    });
  }, [user.token]);

  useEffect(() => {
    const handle = (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      setPaletteMode(newColorScheme);
    };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handle);
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handle);
    };
  }, [setPaletteMode]);

  const changeVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    changeVh();

    window.addEventListener("resize", () => {
      changeVh();
    });

    return () => {
      window.removeEventListener("resize", changeVh, false);
    };
  }, []);

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={zhCNLocale}>
        <ThemeProvider theme={themeCustomization({ paletteMode })}>
          <ScrollToTop />
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
};
