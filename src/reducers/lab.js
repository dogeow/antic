import { logged } from "helpers";
import produce from "immer";
import _ from "lodash";

const hour = new Date().getHours();
const isRest = (hour >= 18 && hour <= 24) || (hour >= 0 && hour <= 6);
const paletteMode = isRest ? "dark" : "light";

const defaultState = {
  snackOpen: false,
  snackMessage: "",
  toggleDrawer: false,
  paletteMode,
  isExpired: true,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
  users: localStorage.users ? JSON.parse(localStorage.users) : [],
  post: { tags: [], category: { id: "", name: "" } },
};

export default (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "CHANGE_USER":
        logged(action.payload);
        draft.isExpired = false;
        draft.token = `Bearer ${action.payload.token}`;
        draft.userId = action.payload.userId;
        draft.userName = action.payload.userName;
        draft.userEmail = action.payload.userEmail;
        draft.snackMessage = "切换用户成功";
        break;
      case "LOGIN":
        logged(action.payload);
        let users = draft.users;
        users.push({
          token: `Bearer ${action.payload.token}`,
          userId: action.payload.userId,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        });
        users = _.uniqBy(users, "userId");
        draft.users = users;
        localStorage.setItem("users", JSON.stringify(users));

        draft.isExpired = false;
        draft.toke = `Bearer ${action.payload.token}`;
        draft.userId = action.payload.userId;
        draft.userName = action.payload.userName;
        draft.userEmail = action.payload.userEmail;
        draft.snackMessage = "登录成功";
        draft.users = users;
        break;
      case "TOGGLE_DRAWER":
        draft.toggleDrawer = !state.toggleDrawer;
        break;
      case "SNACK_TOGGLE":
        draft.snackOpen = !state.snackOpen;
        break;
      case "SNACK_MESSAGE":
        draft.snackOpen = true;
        draft.snackMessage = action.payload;
        break;
      case "ACCESS_TOKEN":
        draft.token = action.token;
        break;
      case "TOGGLE_THEME":
        draft.paletteMode = draft.paletteMode === "dark" ? "light" : "dark";
        break;
      case "LOGOUT":
        draft.isExpired = true;
        draft.token = null;
        draft.userId = null;
        draft.userName = null;
        draft.userEmail = null;
        draft.snackOpen = true;
        draft.snackMessage = "退出成功";
        draft.users = [];
        break;
      case "POST_SAVE":
        draft.post = action.payload;
        break;
      case "POST_CONTENT_SAVE":
        draft.post.content = action.payload;
        break;
      case "POST_TITLE":
        draft.post.title = action.payload;
        break;
      case "POST_CATEGORY":
        draft.post.category = action.payload;
        break;
      case "TAGS_DELETE": {
        _.remove(draft.post.tags, { name: action.payload });
        draft.post.tags = draft.post.tags || [];
        break;
      }
      case "TAGS_ADD": {
        draft.post.tags = action.payload;
        break;
      }
    }
  });
