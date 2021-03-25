import { connect } from "react-redux";

import {
  postCategory,
  postContentSave,
  postSave,
  postTitle,
} from "../../actions";
import PostCreate from "../../containers/post/PostCreate";

const mapStateToProps = (state) => ({
  post: state.lab.post,
});

const mapDispatchToProps = (dispatch) => ({
  postSave: (post) => {
    dispatch(postSave(post));
  },
  postCategory: (category) => {
    dispatch(postCategory(category));
  },
  postContentSave: (content) => {
    dispatch(postContentSave(content));
  },
  postTitle: (title) => {
    dispatch(postTitle(title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
