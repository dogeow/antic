import { isExpired } from "../helpers";

const hour = new Date().getHours();
const themePaletteType =
  (hour >= 18 && hour <= 24) || (hour >= 0 && hour <= 6) ? "dark" : "light";

const defaultState = {
  toggleDrawer: false,
  themePaletteType,
  is_expired: isExpired(),
  access_token: localStorage.getItem("token") || null,
  user_id: localStorage.getItem("userId") || null,
  user_name: localStorage.getItem("user_name") || null,
  user_email: localStorage.getItem("user_email") || null,
};

const lab = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        is_expired: isExpired(),
        token: action.token,
        userId: action.userId,
        user_name: action.user_name,
        user_email: action.user_email,
      };
    case "TOGGLE_DRAWER":
      return { ...state, toggleDrawer: !state.toggleDrawer };
    case "ACCESS_TOKEN":
      return { ...state, token: action.token };
    case "TOGGLE_THEME":
      return {
        ...state,
        themePaletteType: state.themePaletteType === "dark" ? "light" : "dark",
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        is_expired: true,
        userId: null,
        user_name: null,
        user_email: null,
      };
    default:
      return state;
  }
};

export default lab;
