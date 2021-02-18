import { createAction } from "@reduxjs/toolkit";

// lab
export const snackMessage = createAction("SNACK_MESSAGE");
export const snackToggleAction = createAction("SNACK_TOGGLE");
export const loginAction = (user) => ({
  type: "LOGIN",
  token: user.access_token,
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  expiresIn: user.expires_in,
});

// emoji
export const whichPage = createAction("WHICH_PAGE");
export const selectCategory = createAction("SELECT_CATEGORY");
export const selectTag = createAction("SELECT_TAG");
export const expandTag = createAction("EXPAND_TAG");
export const expandCategory = createAction("EXPAND_CATEGORY");
export const logoutAction = createAction("LOGOUT");
export const toggleTheme = createAction("TOGGLE_THEME");
export const toggleDrawer = createAction("TOGGLE_DRAWER");
export const search = createAction("SEARCH");
export const loading = createAction("LOADING");

// chat
export const message = createAction("MESSAGE");
export const chatBoard = createAction("CHAT_BOARD");
export const peoples = createAction("PEOPLES");
