import { atom } from "recoil";

export const postState = atom({
  key: "post",
  default: <Post>{
    tags: [],
  },
});

export const tagsState = atom({
  key: "tags",
  default: [],
});

export const allTagsState = atom({
  key: "allTags",
  default: [],
});
