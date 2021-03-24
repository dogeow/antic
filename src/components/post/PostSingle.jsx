import { connect } from "react-redux";

import { postSave } from "../../actions";
import PostSingle from "../../containers/post/PostSingle";

const mapStateToProps = (state) => ({
  post: state.lab.post,
});

const mapDispatchToProps = (dispatch) => ({
  postSave: (post) => {
    dispatch(postSave(post));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSingle);
