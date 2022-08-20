import face from "resources/face.json";

const defaultState = {
  allEmoji: false,
  // Display

  // Statistics
  filterStatistics: { pageNum: Math.ceil(face.length / 9) },
  filterNum: face.length, // 筛选后共有几张
  // Switch Status

  faceIsLoading: true, // 表情图片正在加载中？
};

export default (state = defaultState, action) => {
  let data = {};
  switch (action.type) {
    case "SELECT_CATEGORY": {
      if (action.payload === state.selectedCategory) {
        // 分类多次点击原样返回
        return state;
      }

      const categoryData = categoryFilter(face, action.payload);
      const categoryDataRange = offset(state.currentPage, state.pageLimit);
      data = categoryData.slice(categoryDataRange.start, categoryDataRange.end);
      return {
        ...state,
        selectedCategory: action.payload,
        selectedTag: "全部",
        displayTag: allTag(categoryData),
        data,
        currentPage: 1,
        filterNum: categoryData.length,
        faceIsLoading: action.payload !== state.selectedCategory,
        expandCategory: !isMobile,
      };
    }
    case "SELECT_TAG": {
      const selectedTag = action.payload;
      // 选择标签时，在原有被选择的分类上继续筛选
      const tagData = getCategoryAndTagData(
        face,
        state.selectedCategory,
        action.payload
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
        faceIsLoading: action.payload !== state.selectedTag,
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
      const whichPageDataRange = offset(action.payload, state.pageLimit);
      data = whichPageData.slice(
        whichPageDataRange.start,
        whichPageDataRange.end
      );

      return {
        ...state,
        data,
        currentPage: action.payload,
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
        currentPage: 1,
        filterNum: face.length,
        expandCategory: !isMobile,
        openSetting: false,
      };
    }
    default:
      return state;
  }
};
