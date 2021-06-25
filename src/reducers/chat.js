import produce from "immer";
import _ from "lodash";

const defaultState = {
  chatBoard: [],
  message: "",
  peoples: [
    {
      id: 0,
      name: "机器人",
      email: undefined,
    },
  ],
};

export default (state = defaultState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "LOGIN":
        draft.peoples = [];
        break;
      case "LOGOUT":
        draft.peoples = [];
        break;
      case "ADD_PEOPLES":
        draft.peoples.push(...action.payload);
        draft.peoples = _.uniqBy(draft.peoples, "id");
        break;
      case "ADD_PEOPLE":
        draft.peoples.push(action.payload);
        draft.peoples = _.uniqBy(draft.peoples, "id");
        break;
      case "DELETE_PEOPLE":
        _.remove(draft.peoples, { id: action.payload.id });
        _.remove(draft.chatBoard, { id: action.payload.id });
        break;
      case "CHAT_BOARD":
        draft.chatBoard.push(action.payload);
        break;
    }
  });
