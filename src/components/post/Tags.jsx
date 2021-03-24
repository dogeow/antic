import { connect } from "react-redux";

import { tagsAdd, tagsDelete } from "../../actions";
import Tags from "../../containers/post/Tags";
import axios from "../../instance/axios";

const mapStateToProps = (state) => ({
  tags: state.lab.post.tags,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  tagsDelete: (post, tagName) => {
    axios
      .delete(`/posts/${post.id}/tag`, { data: { name: tagName } })
      .then(({ data: count }) => {
        if (count === 1) {
          dispatch(tagsDelete(tagName));
        }
      });
  },
  tagsAdd: (post, tagName) => {
    axios.post(`/posts/${post.id}/tag`, { name: tagName }).then(({ data }) => {
      dispatch(tagsAdd(data));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
