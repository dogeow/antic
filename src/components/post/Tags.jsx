import { connect } from "react-redux";

import { tagsDelete } from "../../actions";
import Tags from "../../containers/post/Tags";
import { logout } from "../../helpers";
import axios from "../../instance/axios";

const mapStateToProps = (state) => ({
  toggleDrawer: state.lab.toggleDrawer,
  paletteMode: state.lab.paletteMode,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  tagsDelete: () => {
    logout();
    axios
      .delete(`/posts/${post.id}/tag`, { data: { name } })
      .then(({ count }) => {
        console.log(count);
        console.log(typeof count);
        if (count === 1) {
          dispatch(tagsDelete(name));
        } else {
          console.log("233");
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
