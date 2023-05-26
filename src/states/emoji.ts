import uniq from "lodash/uniq";
import { isMobile } from "react-device-detect";
import { atom, selector } from "recoil";

import facesJson from "../resources/face.json";

/**
 * 分类筛选
 *
 * @param {array} faces 表情数组
 * @param {string} category 点击了哪个分类
 * @return {array} 符合该分类的表情数组
 */
function categoryFilter(faces: Face[], category: string) {
  if (category === "全部") {
    return faces;
  }

  const filter: Face[] = [];
  faces.map((face) => {
    return face.category === category ? filter.push(face) : null;
  });

  return filter;
}

/**
 * 标签筛选
 *
 * @param {array} faces 表情数组
 * @param {string} tagState 已被选择的标签
 * @return {array} 符合该标签的数组
 */
function tagFilter(faces: Face[], tagState: string) {
  if (tagState === "全部") {
    return faces;
  }

  const filter = [];
  for (const face of faces) {
    if (face.tag.includes(tagState)) {
      filter.push(face);
    }
  }

  return filter;
}

/**
 * 计算偏移量
 * @param {number} whichPage 第几页
 * @param {number} pageLimit 一页显示几张
 * @return {{start: number, end: number}}
 */
function offset(whichPage: number, pageLimit: number) {
  return {
    start: (whichPage - 1) * pageLimit,
    end: (whichPage - 1) * pageLimit + pageLimit,
  };
}

function getCategoryAndTagData(faces: Face[], selectedCategory: string, selectedTag: string) {
  return tagFilter(categoryFilter(faces, selectedCategory), selectedTag);
}

/**
 * 返回表情数组所有的标签
 *
 * @return {array} 所有的标签
 */
function allTag() {
  let tagsList: string[] = [];
  facesJson.map((gif) => {
    return (tagsList = tagsList.concat(gif.tag));
  });

  return uniq(tagsList);
}

export const displayTagState = atom({
  key: "displayTagState",
  default: allTag(),
});

export const isCategoryExpandedState = atom({
  key: "isCategoryExpandedState",
  default: !isMobile,
});

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "全部",
});

export const selectedTagState = atom({
  key: "selectedTagState",
  default: "全部",
});

export const expandTagState = atom({
  key: "expandTagState",
  default: !isMobile,
});

export const pageLimitState = atom({
  key: "pageLimitState",
  default: 9,
});

export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const faceIsLoadingState = atom({
  key: "faceIsLoadingState",
  default: true,
});

export const facesState = atom({
  key: "facesState",
  default: facesJson,
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const filteredEmojiListState = selector({
  key: "filteredEmojiListState",
  get: ({ get }) => {
    const currentPage = get(currentPageState);
    const selectedCategory = get(selectedCategoryState);
    const selectedTag = get(selectedTagState);
    const pageLimit = get(pageLimitState);
    const search = get(searchState);

    if (search !== "") {
      const filter: Face[] = [];
      facesJson.forEach((face) => {
        if (face.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          filter.push(face);
        }
      });

      return filter;
    } else {
      const whichPageData = getCategoryAndTagData(facesJson, selectedCategory, selectedTag);

      const whichPageDataRange = offset(currentPage, pageLimit);

      return whichPageData.slice(whichPageDataRange.start, whichPageDataRange.end);
    }
  },
});

export const filteredNum = selector({
  key: "filteredNum",
  get: ({ get }) => {
    get(facesState);
  },
});
