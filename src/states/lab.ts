import { PaletteMode } from "@mui/material";
import { atom } from "recoil";

import { getItem } from "../helpers";

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
  default: getItem("user") || {
    id: "",
    name: "",
    email: "",
    accessToken: "",
  },
});
export const isExpiredState = atom({
  key: "isExpired",
  default: getItem("user.accessToken"),
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
