import { connect } from "react-redux";

import { chatBoard, message, peoples } from "../actions";
import Chat from "../components/Chat";

const mapStateToProps = (state) => ({
  chat: state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  message: (value) => {
    dispatch(message(value));
  },
  chatBoard: (value) => {
    dispatch(chatBoard(value));
  },
  setPeoples: (value) => {
    dispatch(peoples(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
