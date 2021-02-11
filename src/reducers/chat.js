const defaultState = {
  chatBoard: [],
  message: "",
  peoples: [],
};

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case "MESSAGE":
      return { ...state, message: action.payload };
    case "PEOPLES":
      return { ...state, peoples: action.payload };
    case "CHAT_BOARD":
      return { ...state, chatBoard: action.payload };
    default:
      return state;
  }
};

export default chat;
