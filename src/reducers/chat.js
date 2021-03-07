import _ from "lodash";

const defaultState = {
  chatBoard: [],
  message: "",
  peoples: [],
};

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, peoples: [] };
    case "LOGOUT":
      return { ...state, peoples: [] };
    case "ADD_PEOPLES":
      return {
        ...state,
        peoples: _.uniqBy([...state.peoples, ...action.payload], "id"),
      };
    case "ADD_PEOPLE":
      return {
        ...state,
        peoples: _.uniqBy([...state.peoples, action.payload], "id"),
      };
    case "DELETE_PEOPLE":
      const peoples = state.peoples;
      const chatBoard = state.chatBoard;
      _.remove(peoples, { id: action.payload.id });
      _.remove(chatBoard, { id: action.payload.id });
      return {
        ...state,
        peoples,
        chatBoard,
      };
    case "CHAT_BOARD":
      return { ...state, chatBoard: [...state.chatBoard, action.payload] };
    default:
      return state;
  }
};

export default chat;
