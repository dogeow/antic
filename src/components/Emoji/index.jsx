import { connect } from "react-redux";

import Emoji from "./Emoji";

const mapStateToProps = (state) => ({
  emoji: state.emoji,
  ...state.emoji,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (value) => {
    dispatch({ type: "SEARCH", value });
  },
  toggleTag: () => {
    dispatch({ type: "EXPAND_TAG", value: !ownProps.expandTag });
  },
  select_tag: (value) => {
    dispatch({ type: "SELECT_TAG", value });
  },
  toggleCategory: () => {
    dispatch({ type: "EXPAND_CATEGORY", value: !ownProps.expandCategory });
  },
  select_category: (value) => {
    dispatch({ type: "SELECT_CATEGORY", value });
  },
  which_page: (value) => {
    dispatch({ type: "WHICH_PAGE", value });
  },
  is_loading: (value) => {
    dispatch({ type: "IS_LOADING", value });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Emoji);
