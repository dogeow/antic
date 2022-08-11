import { atom } from "recoil";

// todo 用户离开，聊天内容删掉

// _.remove(draft.peoples, { id: userid });

export const peopleState = atom({
  key: "people",
  default: [
    {
      id: 0,
      name: "机器人",
      email: undefined,
    },
  ],
});

export const chatBoardState = atom({
  key: "chatBoard",
  default: [],
});
