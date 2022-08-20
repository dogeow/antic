import uniq from "lodash/uniq";
import { isMobile } from "react-device-detect";
import { atom, selector } from "recoil";

import facesJson from "../resources/face.json";

/**
 * 标签筛选
 * @param {array} gifs 表情数组
 * @param {string} tagState 已被选择的标签
 * @return {array} 符合该标签的数组
 */
function tagFilter(gifs, tagState) {
  if (tagState === "全部") {
    return gifs;
  }

  const filter = [];
  for (const gif of gifs) {
    if (gif.tag.includes(tagState)) {
      filter.push(gif);
    }
  }

  return filter;
}

/**
 * 计算偏移量
 * @param {int} whichPage 第几页
 * @param {int} pageLimit 一页显示几张
 * @return {{start: number, end: number}}
 */
function offset(whichPage, pageLimit) {
  return {
    start: (whichPage - 1) * pageLimit,
    end: (whichPage - 1) * pageLimit + pageLimit,
  };
}

function getCategoryAndTagData(data, selectedCategory, selectedTag) {
  return tagFilter(categoryFilter(data, selectedCategory), selectedTag);
}

/**
 * 返回表情数组所有的标签
 *
 * @param {array} gifs 表情数组
 * @return {array}
 */
function allTag() {
  let tagsList = [];
  facesJson.map((gif) => {
    return (tagsList = tagsList.concat(gif.tag));
  });

  return uniq(tagsList);
}

/**
 * 分类筛选
 *
 * @param {array} gifs 表情数组
 * @param {string} category 点击了哪个分类
 * @return {array} 符合该分类的表情数组
 */
function categoryFilter(gifs, category) {
  if (category === "全部") {
    return gifs;
  }
  const filter = [];
  gifs.map((gif) => {
    return gif.category === category ? filter.push(gif) : null;
  });

  return filter;
}

export const displayTagState = atom({
  key: "displayTagState",
  default: allTag(),
});

export const expandCategoryState = atom({
  key: "expandCategoryState",
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
      const filter = [];
      facesJson.forEach((face) => {
        if (face.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          filter.push(face);
        }
      });

      return filter;
    } else {
      const whichPageData = getCategoryAndTagData(
        facesJson,
        selectedCategory,
        selectedTag
      );

      const whichPageDataRange = offset(currentPage, pageLimit);

      return whichPageData.slice(
        whichPageDataRange.start,
        whichPageDataRange.end
      );
    }
  },
});

export const filteredNum = selector({
  key: "filteredNum",
  get: ({ get }) => {
    const faces = get(facesState);
  },
});
