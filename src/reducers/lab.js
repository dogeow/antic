import _ from "lodash";

import { expired, logged } from "../helpers";

const isExpired = expired();
const hour = new Date().getHours();
const isRest = (hour >= 18 && hour <= 24) || (hour >= 0 && hour <= 6);
const paletteMode = isRest ? "dark" : "light";

const defaultState = {
  snackOpen: false,
  snackMessage: "",
  toggleDrawer: false,
  paletteMode,
  isExpired: isExpired,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
  users: localStorage.users ? JSON.parse(localStorage.users) : [],
  post: { tags: [], category: { id: "", name: "" } },
};

const lab = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      logged(action);
      const users = _.uniqBy(
        [
          ...state.users,
          {
            token: `Bearer ${action.token}`,
            userId: action.userId,
            userName: action.userName,
            userEmail: action.userEmail,
          },
        ],
        "userId"
      );
      localStorage.setItem("users", JSON.stringify(users));
      return {
        ...state,
        isExpired: false,
        token: `Bearer ${action.token}`,
        userId: action.userId,
        userName: action.userName,
        userEmail: action.userEmail,
        snackMessage: "登录成功",
        users: users,
      };
    case "TOGGLE_DRAWER":
      return { ...state, toggleDrawer: !state.toggleDrawer };
    case "SNACK_TOGGLE":
      return { ...state, snackOpen: !state.snackOpen };
    case "SNACK_MESSAGE":
      return { ...state, snackMessage: action.payload };
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
        isExpired: true,
        token: null,
        userId: null,
        userName: null,
        userEmail: null,
        snackOpen: true,
        snackMessage: "退出成功",
        users: [],
      };
    case "POST_SAVE":
      return { ...state, post: action.payload };
    case "POST_CONTENT_SAVE":
      return { ...state, post: { ...state.post, content: action.payload } };
    case "POST_TITLE":
      return { ...state, post: { ...state.post, title: action.payload } };
    case "POST_CATEGORY":
      return { ...state, post: { ...state.post, category: action.payload } };
    case "TAGS_DELETE": {
      const newTags = state.post.tags;
      _.remove(newTags, { name: action.payload });
      return { ...state, post: { ...state.post, tags: newTags || [] } };
    }
    case "TAGS_ADD": {
      return {
        ...state,
        post: {
          ...state.post,
          tags: [...state.post.tags, action.payload],
        },
      };
    }
    default:
      return state;
  }
};

export default lab;
