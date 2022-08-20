import { atom } from "recoil";

// 夜晚模式
let paletteMode;
const hour = new Date().getHours();
const isRest = (hour >= 23 && hour <= 24) || (hour >= 0 && hour <= 5);
if (isRest) {
  paletteMode = "dark";
} else {
  paletteMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}

export const paletteModeState = atom({
  key: "paletteMode",
  default: paletteMode,
});

export const toggleDrawerState = atom({
  key: "toggleDrawer",
  default: false,
});

export const isExpiredState = atom({
  key: "isExpired",
  default: localStorage.token === undefined,
});

export const isSnackOpenState = atom({
  key: "isSnackOpen",
  default: false,
});

export const snackMessageState = atom({
  key: "snackMessage",
  default: "",
});

export const userState = atom({
  key: "user",
  default: {
    token: localStorage.token || "",
    userId: localStorage.userId || "",
    userEmail: localStorage.userEmail || "",
    userName: localStorage.userName || "",
  },
});

export const usersState = atom({
  key: "users",
  default: [],
});
