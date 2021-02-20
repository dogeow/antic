import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import RatingUi from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import * as React from "react";
import Swal from "sweetalert2";

import axios from "../instance/axios";

const useStyles = makeStyles(() => ({
  rating: {
    display: "flex",
    alignItems: "center",
  },
}));

const labels = {
  1: "糟糕",
  2: "较差",
  3: "一般",
  4: "良好",
  5: "优秀",
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ""}>
      <div {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Rating = () => {
  const classes = useStyles();
  const [hover, setHover] = React.useState(-1);
  const [value, setValue] = React.useState(3);

  const postRating = () => {
    axios.post("rating").then((json) => {
      if (json.status === 200) {
        Swal.fire({
          position: "top-end",
          type: "success",
          title: "评级成功",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        alert("评级失败！");
      }
    });
  };

  return (
    <div className={classes.rating}>
      <RatingUi
        name="hover-side"
        value={value}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
          postRating();
        }}
      />
      <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
    </div>
  );
};

export default Rating;
