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
    case "PEOPLES":
      return { ...state, peoples: action.payload };
    case "CHAT_BOARD":
      return { ...state, chatBoard: [...state.chatBoard, action.payload] };
    default:
      return state;
  }
};

export default chat;
