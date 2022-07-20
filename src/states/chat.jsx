import { atom } from "recoil";

export const personState = atom({
  key: "person",
  default: {},
});

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
