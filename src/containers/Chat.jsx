import { connect } from "react-redux";

import { chatBoard, message, peoples } from "../actions";
import Chat from "../components/Chat";

const mapStateToProps = (state) => ({
  chat: state.chat,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  chatBoardAdd: (value) => {
    dispatch(chatBoard(value));
  },
  setPeoples: (value) => {
    dispatch(peoples(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
