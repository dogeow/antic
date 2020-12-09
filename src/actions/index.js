import { createAction } from "@reduxjs/toolkit";

export const loginAction = (accessToken, user_id, user_name, user_email) => ({
  type: "LOGIN",
  accessToken,
  user_id,
  user_name,
  user_email,
});

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
