import { connect } from 'react-redux'
import Emoji from './Emoji'

const mapStateToProps = (state, ownProps) => (
  {emoji: state.emoji, ...state.emoji}
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggle_spin: (value) => {
    dispatch({type: "TOGGLE_SPIN", value});
  },
  search: (value) => {
    dispatch({type: "SEARCH", value});
  },
  toggleTag: () => {
    dispatch({type: "EXPAND_TAG", value: !ownProps.expandTag})
  },
  select_tag: (value) => {
    dispatch({type: "SELECT_TAG", value})
  },
  toggleCategory: (value) => {
    dispatch({type: "EXPAND_CATEGORY", value: !ownProps.expandCategory});
  },
  select_category: (value) => {
    dispatch({type: "SELECT_CATEGORY", value});
  },
  which_page: (value) => {
    dispatch({type: "WHICH_PAGE", value});
  },
  toggle_loading: () => {
    dispatch({type: "TOGGLE_LOADING"});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emoji)
