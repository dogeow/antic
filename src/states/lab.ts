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

export const severityState = atom<"success" | "info" | "warning" | "error">({
  key: "severityState",
  default: "success",
});

interface snackObject {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  isOpen?: boolean;
}

export const snackState = selector({
  key: "snack",
  get: ({ get }): snackObject => {
    const message = get(snackMessageState);
    const severity = get(severityState);
    const isOpen = get(isSnackOpenState);
    return { message, severity, isOpen };
  },
  set: ({ set }, data) => {
    const { isOpen, message, severity } = data as snackObject;
    set(snackMessageState, message);
    set(severityState, severity || "success");
    set(isSnackOpenState, isOpen || true);
  },
});

export const isSettingsOpenState = atom({
  key: "isSettingsOpen",
  default: false,
});

export const isSearchOpenState = atom({
  key: "isSearchOpen",
  default: false,
});
