import isEqual from "lodash/isEqual";
import uniq from "lodash/uniq";
import { isMobile } from "react-device-detect";

import face from "../resources/face.json";

/**
 * 分类筛选
 *
 * @param array 表情数组
 * @param category 点击了哪个分类
 * @returns {Array} 符合该分类的表情数组
 */
function categoryFilter(array, category) {
  if (category === "全部") {
    return array;
  }
  const filter = [];
  array.map((single) => {
    return single.category === category ? filter.push(single) : null;
  });

  return filter;
}

/**
 * 标签筛选
 *
 * @param array 表情数组
 * @param tagState 已被选择的标签
 * @returns {Array} 符合该标签的数组
 */
function tagFilter(array, tagState) {
  if (tagState === "全部") {
    return array;
  }

  const filter = [];
  for (const single of array) {
    if (single.tag.includes(tagState)) {
      filter.push(single);
    }
  }

  return filter;
}

/**
 * 返回表情数组所有的标签
 * @param array
 * @returns {*}
 */
function allTag(array) {
  let tagsList = [];
  array.map((single) => {
    return (tagsList = tagsList.concat(single.tag));
  });

  return uniq(tagsList);
}

/**
 * 计算偏移量
 * @param whichPage 第几页
 * @param pageLimit 一页显示几张
 * @returns {{start: number, end: number}}
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

const defaultState = {
  // Data
  data: face.slice(0, 9), // 表情数据
  // Selected
  selectedCategory: "全部",
  selectedTag: "全部",
  currentPage: 1, // 当前页面
  allEmoji: false,
  // Display
  displayTag: allTag(face), // 显示该分类下的标签
  pageLimit: 9, // 每页几条数据（表情）
  // Statistics
  filterStatistics: { pageNum: Math.ceil(face.length / 9) },
  filterNum: face.length, // 筛选后共有几张
  // Switch Status
  expandCategory: !isMobile, // 展开分类？
  expandTag: !isMobile, // 展开标签？
  faceIsLoading: true, // 表情图片正在加载中？
};

export default (state = defaultState, action) => {
  let data = {};
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        faceIsLoading: action.payload,
      };
    case "SELECT_CATEGORY": {
      if (action.value === state.selectedCategory) {
        // 分类多次点击原样返回
        return state;
      }

      const categoryData = categoryFilter(face, action.value);
      const categoryDataRange = offset(state.currentPage, state.pageLimit);
      data = categoryData.slice(categoryDataRange.start, categoryDataRange.end);
      return {
        ...state,
        selectedCategory: action.value,
        selectedTag: "全部",
        displayTag: allTag(categoryData),
        data,
        currentPage: 1, // 点击分类后都切换到第一页
        filterNum: categoryData.length,
        faceIsLoading: action.value !== state.selectedCategory,
        expandCategory: !isMobile,
      };
    }
    case "SELECT_TAG": {
      const selectedTag = action.value;
      // 选择标签时，在原有被选择的分类上继续筛选
      const tagData = getCategoryAndTagData(
        face,
        state.selectedCategory,
        action.value
      );
      const tagDataRange = offset(state.currentPage, state.pageLimit);
      data = tagData.slice(tagDataRange.start, tagDataRange.end);
      if (isEqual(tagData, state.data)) {
        return {
          ...state,
          selectedTag,
        };
      }
      return {
        ...state,
        selectedTag,
        data,
        filterNum: tagData.length,
        currentPage: 1,
        faceIsLoading: action.value !== state.selectedTag,
        expandTag: !isMobile,
      };
    }
    case "EXPAND_CATEGORY":
      return {
        ...state,
        expandCategory: !state.expandCategory,
      };
    case "EXPAND_TAG":
      return {
        ...state,
        expandTag: !state.expandTag,
      };
    case "WHICH_PAGE": {
      const whichPageData = getCategoryAndTagData(
        face,
        state.selectedCategory,
        state.selectedTag
      );
      const whichPageDataRange = offset(action.value, state.pageLimit);
      data = whichPageData.slice(
        whichPageDataRange.start,
        whichPageDataRange.end
      );

      return {
        ...state,
        data,
        currentPage: action.value,
        faceIsLoading: true,
      };
    }
    case "SEARCH": {
      const filter = [];
      face.map((single) => {
        if (
          single.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
        ) {
          return filter.push(single);
        }

        return null;
      });

      return {
        ...state,
        data: filter,
        filterNum: filter.length,
        currentPage: 1,
        faceIsLoading: true,
      };
    }
    case "OPEN_SETTING":
      return {
        ...state,
        openSetting: action.value,
        openSideBar: false,
      };
    case "OPEN_DEBUG":
      return {
        ...state,
        openDebug: action.value,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        openSideBar: !state.openSideBar,
      };
    case "ALL_EMOJI": {
      let filterAllEmoji = [];
      if (action.value) {
        filterAllEmoji = face;
      } else {
        filterAllEmoji = face.slice(0, 9);
      }
      return {
        ...state,
        allEmoji: action.value,
        selectedCategory: "全部",
        selectedTag: "全部",
        displayTag: allTag(face),
        data: filterAllEmoji,
        currentPage: 1, // 点击分类后都切换到第一页
        filterNum: face.length,
        expandCategory: !isMobile,
        openSetting: false,
      };
    }
    default:
      return state;
  }
};
