import { atom } from "recoil";

export const paletteModeState = atom({
  key: "paletteMode",
  default:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
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
