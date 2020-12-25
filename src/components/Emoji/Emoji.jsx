import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import imagesLoaded from "imagesloaded";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "react-spinner-children";
import Viewer from "react-viewer";
import Swal from "sweetalert2";

import face from "../../resources/face.json";
import BootNav from "./BootNav";
import Filter from "./Filter";
import FilterStatistics from "./FilterStatistics";

const customSpinConfig = {
  lines: 10,
};

const useStyles = makeStyles((theme) => ({
  hr: {
    width: "100%",
    border: "none",
    borderBottom: "1px dashed #DaDaDa",
    height: "1px",
    margin: "10px 10px",
  },
  main: {
    margin: theme.spacing(3, 2),
  },
}));

const Emoji = (props) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const imgLoad = imagesLoaded("#emoji");
    imgLoad.on("always", () => props.loading(false));

    return () => imgLoad.off("always");
  }, [props]);

  face.map((item) => {
    item.src = `${process.env.REACT_APP_CDN_URL}/emoji/${item.fileName}`;
    item.alt = item.fileName;

    return item;
  });

  const handleUpload = () => {
    history.push("/emoji/create");
  };

  const handleSearch = () => {
    Swal.fire({
      title: "搜索",
      input: "text",
      showCancelButton: true,
      inputPlaceholder: "输入您想搜索的表情",
      inputValidator: (value) => {
        if (!value) {
          return "没有输入！";
        }
        props.search(value);
        Swal.close();
        return null;
      },
    });
  };

  return (
    <Grid container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch()}
      >
        搜索
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleUpload()}
        style={{ marginLeft: 20 }}
      >
        上传
      </Button>
      <hr className={classes.hr} />
      <Filter
        lab={props.lab}
        selectedCategory={props.emoji.selectedCategory}
        selectedTag={props.emoji.selectedTag}
        toggleTag={props.toggleTag}
        expandTag={props.emoji.expandTag}
        expandCategory={props.emoji.expandCategory}
        toggleCategory={props.toggleCategory}
        displayTag={props.emoji.displayTag}
        selectCategory={props.selectCategory}
        selectTag={props.selectTag}
      />
      <FilterStatistics
        filterNum={props.emoji.filterNum}
        currentPage={props.emoji.currentPage}
        pageLimit={props.emoji.pageLimit}
      />
      <Grid
        id="emoji"
        container
        justify="center"
        alignItems="flex-end"
        spacing={2}
        style={{ marginBottom: 80 }}
      >
        {props.emoji.data.length > 0 ? (
          props.emoji.data.map((item, index) => (
            <Grid key={index} item xs={4} style={{ textAlign: "center" }}>
              <img
                id={index}
                src={`${process.env.REACT_APP_CDN_URL}/emoji/${item.fileName}`}
                alt={item.name}
                width="100"
                onClick={() => {
                  setVisible(true);
                  setIndex(
                    (props.emoji.currentPage - 1) * props.emoji.pageLimit +
                      index
                  );
                }}
              />
              <Typography variant="body2" component="h3">
                {item.name.split(".")[0]}
              </Typography>
            </Grid>
          ))
        ) : (
          <Grid item style={{ margin: "20px 0" }}>
            <h3>没有找到</h3>
          </Grid>
        )}
      </Grid>
      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={face}
        activeIndex={index}
      />
      <BootNav
        filterNum={props.emoji.filterNum}
        currentPage={props.emoji.currentPage}
        whichPage={props.whichPage}
        pageLimit={props.emoji.pageLimit}
      />
      <Spinner loaded={!props.emoji.faceIsLoading} config={customSpinConfig} />
    </Grid>
  );
};

export default Emoji;
