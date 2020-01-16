import { connect } from 'react-redux'
import Emoji from './components/Emoji'

const mapStateToProps = (state, ownProps) => (
  {emoji: state.emoji, ...state.emoji}
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggle_display_img: (index) => {
    dispatch({type: "TOGGLE_DISPLAY_IMG", value: index});
  },
  toggle_spin: (value) => {
    dispatch({type: "TOGGLE_SPIN", value: value});
  },
  search: (value) => {
    dispatch({type: "SEARCH", value: value});
  },
  toggleTag: () => {
    dispatch({type: "EXPAND_TAG", value: !ownProps.expandTag})
  },
  select_tag: (value) => {
    dispatch({type: "SELECT_TAG", value: value})
  },
  toggleCategory: (value) => {
    dispatch({type: "EXPAND_CATEGORY", value: !ownProps.expandCategory});
  },
  select_category: (value) => {
    dispatch({type: "SELECT_CATEGORY", value: value});
  },
  which_page: (value) => {
    dispatch({type: "WHICH_PAGE", value: value});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emoji)
