import { isMobile } from "react-device-detect";
import { atom } from "recoil";

export const expandCategoryState = atom({
  key: "expandCategory",
  default: !isMobile,
});
