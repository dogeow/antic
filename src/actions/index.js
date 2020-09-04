import { createAction } from "@reduxjs/toolkit";

export const toggleDrawer = (toggle_drawer) => ({
  type: "TOGGLE_DRAWER",
  toggle_drawer,
});

export const loginAction = (access_token, user_id, user_name, user_email) => ({
  type: "LOGIN",
  access_token,
  user_id,
  user_name,
  user_email,
});

export const search = createAction("SEARCH");
export const loading = createAction("LOADING");
