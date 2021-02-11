import { combineReducers } from "redux";

import chat from "./chat";
import emoji from "./emoji";
import lab from "./lab";

export default combineReducers({
  lab,
  chat,
  emoji,
});
