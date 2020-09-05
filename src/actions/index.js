import { createAction } from "@reduxjs/toolkit";

export const loginAction = (access_token, user_id, user_name, user_email) => ({
  type: "LOGIN",
  access_token,
  user_id,
  user_name,
  user_email,
});

export const toggleTheme = createAction("TOGGLE_THEME");
export const toggleDrawer = createAction("TOGGLE_DRAWER");
export const search = createAction("SEARCH");
export const loading = createAction("LOADING");
