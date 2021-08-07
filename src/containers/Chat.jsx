import {
  addPeople,
  addPeoples,
  chatBoard,
  deletePeople,
  loginAction,
} from "actions";
import Chat from "components/Chat";
import axios from "instance/axios";
import { connect } from "react-redux";

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
  onChatUserLogin: (name = "") => {
    axios
      .post("user/guest", {
        name,
      })
      .then(({ data }) => {
        dispatch(loginAction(data));
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
