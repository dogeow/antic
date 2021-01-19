import { expired } from "../helpers";

const isExpired = expired();
const hour = new Date().getHours();
const isRest = (hour >= 18 && hour <= 24) || (hour >= 0 && hour <= 6);
const paletteMode = isRest ? "dark" : "light";

const defaultState = {
  toggleDrawer: false,
  paletteMode,
  isExpired: isExpired,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
};

const lab = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isExpired: isExpired,
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        userEmail: action.userEmail,
      };
    case "TOGGLE_DRAWER":
      return { ...state, toggleDrawer: !state.toggleDrawer };
    case "ACCESS_TOKEN":
      return { ...state, token: action.token };
    case "TOGGLE_THEME":
      return {
        ...state,
        paletteMode: state.paletteMode === "dark" ? "light" : "dark",
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        isExpired: true,
        userId: null,
        userName: null,
        userEmail: null,
      };
    default:
      return state;
  }
};

export default lab;
