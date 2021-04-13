import _ from "lodash";

const defaultState = {
  id: undefined,
  title: "",
  content: "",
  tags: [],
  public: true,
  category: { id: "", name: "" },
};

const lab = (state = defaultState, action) => {
  switch (action.type) {
    case "POST_SAVE":
      return { ...action.payload };
    case "POST_MODIFY":
      const fieldAndValue = {};
      fieldAndValue[action.payload.field] = action.payload.value;
      return { ...state, ...fieldAndValue };
    case "POST_CONTENT_SAVE":
      return { ...state, content: action.payload };
    case "POST_TITLE":
      return { ...state, title: action.payload };
    case "POST_CATEGORY":
      return { ...state, category: action.payload };
    case "TAGS_DELETE": {
      const newTags = state.post.tags;
      _.remove(newTags, { name: action.payload });
      return { ...state, tags: newTags || [] };
    }
    case "TAGS_ADD": {
      return { ...state, tags: action.payload };
    }
    default:
      return state;
  }
};

export default lab;
