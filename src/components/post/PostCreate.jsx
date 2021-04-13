import { connect } from "react-redux";

import {
  postCategory,
  postContentSave,
  postModify,
  postSave,
  postTitle,
} from "../../actions";
import PostCreate from "../../containers/post/PostCreate";

const mapStateToProps = (state) => ({
  post: state.post,
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
  postModify: (field, value) => {
    dispatch(postModify({ field, value }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
