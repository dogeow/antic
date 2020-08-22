import { combineReducers } from "redux";

import emoji from "./emoji";
import lab from "./lab";

export default combineReducers({
  lab,
  emoji,
});
