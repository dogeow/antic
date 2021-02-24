import chat from "./chat";
import emoji from "./emoji";
import lab from "./lab";

export default (state = {}, action) => {
  return {
    lab: lab(state.lab, action),
    emoji: emoji(state.emoji, action),
    chat: chat(state.chat, action),
  };
};
