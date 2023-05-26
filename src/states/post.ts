import { atom } from "recoil";

export const postState = atom({
  key: "post",
  default: <Post>{
    id: 0,
    title: "",
    content: "",
    category: {
      id: 0,
      name: "",
    },
    tags: [],
    public: false,
    updated_at: "",
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
