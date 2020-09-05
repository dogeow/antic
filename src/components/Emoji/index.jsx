import { connect } from "react-redux";

import {
  expandCategory,
  expandTag,
  loading,
  search,
  selectCategory,
  selectTag,
  whichPage,
} from "../../actions";
import Emoji from "./Emoji";

const mapStateToProps = (state) => ({
  emoji: state.emoji,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  search: (value) => {
    dispatch(search(value));
  },
  toggleTag: () => {
    dispatch(expandTag());
  },
  selectTag: (value) => {
    dispatch(selectTag(value));
  },
  toggleCategory: () => {
    dispatch(expandCategory());
  },
  selectCategory: (value) => {
    dispatch(selectCategory(value));
  },
  whichPage: (value) => {
    dispatch(whichPage(value));
  },
  loading: (value) => {
    dispatch(loading(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Emoji);
