import { PaletteMode } from "@mui/material";
import { atom } from "recoil";

// 夜晚模式
let paletteMode;
const hour = new Date().getHours();
const isRest = (hour >= 23 && hour <= 24) || (hour >= 0 && hour <= 5);
if (isRest) {
  paletteMode = "dark";
} else {
  paletteMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export const paletteModeState = atom({
  key: "paletteMode",
  default: paletteMode as PaletteMode,
});

// 当前登陆用户
export const userState = atom({
  key: "user",
  default: {
    token: localStorage.token || "",
    userId: localStorage.userId || "",
    userEmail: localStorage.userEmail || "",
    userName: localStorage.userName || "",
  },
});
export const isExpiredState = atom({
  key: "isExpired",
  default: localStorage.token === undefined,
});

// 所有登陆用户
export const usersState = atom({
  key: "users",
  default: [],
});

export const isSnackOpenState = atom({
  key: "isSnackOpen",
  default: false,
});

export const snackMessageState = atom({
  key: "snackMessage",
  default: "",
});
