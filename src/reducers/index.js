import chat from "./chat";
import emoji from "./emoji";
import lab from "./lab";
import post from "./post";

export default (state = {}, action) => {
  return {
    lab: lab(state.lab, action),
    post: post(state.post, action),
    chat: chat(state.chat, action),
    emoji: emoji(state.emoji, action),
  };
};
