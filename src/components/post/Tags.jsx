import { connect } from "react-redux";

import { tags, tagsAdd, tagsDelete } from "../../actions";
import Tags from "../../containers/post/Tags";
import axios from "../../instance/axios";

const mapStateToProps = (state) => ({
  tags: state.post.tags,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  tagsDelete: (tagName) => {
    if (ownProps.post?.id) {
      axios
        .delete(`/posts/${ownProps.post.id}/tag`, { data: { name: tagName } })
        .then(({ data: count }) => {
          if (count === 1) {
            dispatch(tagsDelete(tagName));
          }
        });
    } else {
      dispatch(tagsDelete(tagName));
    }
  },
  tagsAdd: (tagName) => {
    if (ownProps.post?.id) {
      axios
        .post(`/posts/${ownProps.post.id}/tag`, { name: tagName })
        .then(({ data }) => {
          dispatch(tags(data));
        });
    } else {
      dispatch(tagsAdd({ name: tagName }));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
