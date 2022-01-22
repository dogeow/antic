import chat from "./chat";
import emoji from "./emoji";
import lab from "./lab";
import post from "./post";

export default (state = {}, action) => {
  return {
    lab: lab(state.lab, action), // 实验室，学习 React
    post: post(state.post, action), // 文章
    chat: chat(state.chat, action), // 聊天室
    emoji: emoji(state.emoji, action), // 表情包
  };
};
