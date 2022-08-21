import { atom } from "recoil";

export const postState = atom({
  key: "post",
  default: {},
});

export const tagsState = atom({
  key: "tags",
  default: [],
});

export const allTagsState = atom({
  key: "allTags",
  default: [],
});
