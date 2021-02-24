import { connect } from "react-redux";

import { addPeople, addPeoples, chatBoard, deletePeople } from "../actions";
import Chat from "../components/Chat";

const mapStateToProps = (state) => ({
  chat: state.chat,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  chatBoardAdd: (value) => {
    dispatch(chatBoard(value));
  },
  addPeople: (value) => {
    dispatch(addPeople(value));
  },
  addPeoples: (value) => {
    dispatch(addPeoples(value));
  },
  deletePeople: (value) => {
    dispatch(deletePeople(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
