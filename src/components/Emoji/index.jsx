import { connect } from "react-redux";

import { loading, search } from "../../actions";
import Emoji from "./Emoji";

const mapStateToProps = (state) => ({
  ...state.emoji,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (value) => {
    dispatch(search(value));
  },
  toggleTag: () => {
    dispatch({ type: "EXPAND_TAG", value: !ownProps.expandTag });
  },
  selectTag: (value) => {
    dispatch({ type: "SELECT_TAG", value });
  },
  toggleCategory: () => {
    dispatch({ type: "EXPAND_CATEGORY", value: !ownProps.expandCategory });
  },
  selectCategory: (value) => {
    dispatch({ type: "SELECT_CATEGORY", value });
  },
  whichPage: (value) => {
    dispatch({ type: "WHICH_PAGE", value });
  },
  loading: (value) => {
    dispatch(loading(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Emoji);
