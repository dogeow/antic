import { atom } from "recoil";

export const paletteModeState = atom({
  key: "paletteMode",
  default: "dark",
});

export const toggleDrawerState = atom({
  key: "toggleDrawer",
  default: false,
});

export const isExpiredState = atom({
  key: "isExpired",
  default: true,
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
    token: "",
    userId: "",
    userEmail: "",
    userName: "",
  },
});

export const usersState = atom({
  key: "users",
  default: [],
});
