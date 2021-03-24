import { connect } from "react-redux";

import { tagsDelete } from "../../actions";
import PostList from "../../containers/post/PostList";
import axios from "../../instance/axios";

const mapStateToProps = (state) => ({
  post: state.lab.post,
});

const mapDispatchToProps = (dispatch) => ({
  tagsDelete: (tagName) => {
    axios
      .delete(`/posts/${post.id}/tag`, { data: { name: tagName } })
      .then(({ data: count }) => {
        if (count === 1) {
          dispatch(tagsDelete(tagName));
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
