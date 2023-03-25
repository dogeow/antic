import { PaletteMode } from "@mui/material";
import { atom, DefaultValue, selector } from "recoil";

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
document.documentElement.setAttribute("data-prefers-color-scheme", paletteMode);
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
  default: getItem("user.accessToken") === null,
});

// 所有登陆用户
export const usersState = atom({
  key: "users",
  default: <User[]>[],
});

export const isSnackOpenState = atom({
  key: "isSnackOpen",
  default: false,
});

export const snackMessageState = atom({
  key: "snackMessage",
  default: "",
});

export const severityState = atom({
  key: "severityState",
  default: "success",
});

export const snackState = selector({
  key: "snack",
  get: ({ get }) => {
    const isOpen = get(isSnackOpenState);
    const message = get(snackMessageState);
    const severity = get(severityState);
    return { isOpen, message, severity };
  },
  set: ({ set }, data) => {
    const {
      message,
      isOpen = false,
      severity = "success",
    } = data as {
      message: string;
      severity?: "success" | "info" | "warning" | "error";
      isOpen?: boolean;
    };
    set(snackMessageState, message);
    set(severityState, severity);
    set(isSnackOpenState, isOpen);
  },
});
