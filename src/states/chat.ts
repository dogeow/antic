import { atom } from "recoil";

export const peopleState = atom({
  key: "people",
  default: [
    {
      id: 0,
      name: "机器人",
      email: null,
    },
  ],
});

export const chatBoardState = atom({
  key: "chatBoard",
  default: [],
});
