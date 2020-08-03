import Swal from "sweetalert2";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-children";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Viewer from "react-viewer";
import imagesLoaded from "imagesloaded";
import { useHistory } from "react-router-dom";
import face from "../../resources/face.json";
import BootNav from "./BootNav";
import FilterStatistics from "./FilterStatistics";
import Filter from "./Filter";

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

const Emoji = ({
  lab,
  faceIsLoading,
  data,
  pageLimit,
  currentPage,
  filterNum,
  select_tag,
  toggleTag,
  is_loading,
  toggleCategory,
  select_category,
  displayTag,
  which_page,
  expandCategory,
  selectedCategory,
  selectedTag,
  search,
  expandTag,
}) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const imgLoad = imagesLoaded("#emoji");
    imgLoad.on("always", () => is_loading(false));

    return () => imgLoad.off("always");
  }, [data, is_loading]);

  face.map((item) => {
    item.src = `${process.env.REACT_APP_CDN_URL}emoji/${item.fileName}`;
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
        search(value);
        Swal.close();
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
        lab={lab}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        toggleTag={toggleTag}
        expandTag={expandTag}
        expandCategory={expandCategory}
        toggleCategory={toggleCategory}
        displayTag={displayTag}
        select_category={select_category}
        select_tag={select_tag}
      />
      <FilterStatistics
        filterNum={filterNum}
        currentPage={currentPage}
        pageLimit={pageLimit}
      />
      <Grid
        id="emoji"
        container
        justify="center"
        alignItems="flex-end"
        spacing={2}
        style={{ marginBottom: 80 }}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <Grid key={index} item xs={4} style={{ textAlign: "center" }}>
              <img
                id={index}
                src={`${process.env.REACT_APP_CDN_URL}emoji/${item.fileName}`}
                alt={item.name}
                width="100"
                onClick={() => {
                  setVisible(true);
                  setIndex((currentPage - 1) * pageLimit + index);
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
        filterNum={filterNum}
        currentPage={currentPage}
        which_page={which_page}
        pageLimit={pageLimit}
      />
      <Spinner loaded={!faceIsLoading} config={customSpinConfig} />
    </Grid>
  );
};

export default Emoji;
