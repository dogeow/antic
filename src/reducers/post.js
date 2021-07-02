import produce from "immer";
import _ from "lodash";

const defaultState = {
  id: undefined,
  title: "",
  content: "",
  tags: [],
  public: true,
  category: { id: "", name: "" },
};

export default (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "POST_SAVE":
        Object.entries(action.payload).forEach(([k, v]) => {
          draft[k] = v;
        });
        break;
      case "POST_MODIFY":
        draft[action.payload.field] = action.payload.value;
        break;
      case "POST_CONTENT_SAVE":
        draft.content = action.payload;
        break;
      case "POST_TITLE":
        draft.title = action.payload;
        break;
      case "POST_CATEGORY":
        draft.category = action.payload;
        break;
      case "TAGS_DELETE": {
        _.remove(draft.tags, { name: action.payload });
        draft.tags = draft.tags || [];
        break;
      }
      case "TAGS_ADD": {
        draft.tags.push(action.payload);
        break;
      }
      case "TAGS": {
        draft.tags = action.payload;
        break;
      }
    }
  });
