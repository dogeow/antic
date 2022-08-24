import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import imagesLoaded from "imagesloaded";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Viewer from "react-viewer";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

import faces from "../../resources/face.json";
import {
  currentPageState,
  displayTagState,
  expandCategoryState,
  expandTagState,
  faceIsLoadingState,
  filteredEmojiListState,
  pageLimitState,
  searchState,
} from "../../states";
import BootNav from "./BootNav";
import Filter from "./Filter";
import FilterStatistics from "./FilterStatistics";

const useStyles = makeStyles(() => ({
  hr: {
    width: "100%",
    border: "none",
    borderBottom: "1px dashed #DaDaDa",
    height: "1px",
    margin: "10px 10px",
  },
}));

const Emoji = () => {
  const navigate = useNavigate();
  const filteredFaces = useRecoilValue(filteredEmojiListState);
  const [, setSearch] = useRecoilState(searchState);
  const [faceIsLoading, setFaceIsLoading] = useRecoilState(faceIsLoadingState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [pageLimit] = useRecoilState(pageLimitState);
  const [displayTag] = useRecoilState(displayTagState);
  const [expandTag, setExpandTag] = useRecoilState(expandTagState);
  const [expandCategory, setExpandCategory] = useRecoilState(expandCategoryState);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const imgLoad = imagesLoaded("#emoji");
    imgLoad.on("done", () => setFaceIsLoading(false));

    return () => imgLoad.off("done");
  }, [setFaceIsLoading]);

  const face = [];
  Object.entries(faces).forEach((item) => {
    item.src = `${import.meta.env.VITE_CDN_URL}/emoji/${item.fileName}`;
    item.alt = item.fileName;
    face.push(item);
  });

  const toggleTag = () => {
    setExpandTag(!expandTag);
  };

  const toggleCategory = () => {
    setExpandCategory(!expandCategory);
  };

  const handleUpload = () => {
    navigate("/emoji/create");
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
        setSearch(value);
        setCurrentPage(1);
        setFaceIsLoading(true);
        Swal.close();
        return null;
      },
    });
  };

  return (
    <Grid container>
      <Button variant="contained" onClick={() => handleSearch()}>
        搜索
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleUpload()} style={{ marginLeft: 20 }}>
        上传
      </Button>
      <hr className={classes.hr} />
      <Filter
        toggleTag={toggleTag}
        expandTag={expandTag}
        expandCategory={expandCategory}
        toggleCategory={toggleCategory}
        displayTag={displayTag}
      />
      <FilterStatistics />
      <Grid id="emoji" container justifyContent="center" alignItems="flex-end" spacing={2} style={{ marginBottom: 80 }}>
        {filteredFaces.length > 0 ? (
          filteredFaces.map((item, index) => (
            <Grid key={index} item xs={4} style={{ textAlign: "center" }}>
              <img
                id={index}
                src={`${import.meta.env.VITE_CDN_URL}/emoji/${item.fileName}`}
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
      <Viewer visible={visible} onClose={() => setVisible(false)} images={face} activeIndex={index} />
      <BootNav />
      <ClipLoader loading={faceIsLoading} color={"blue"} />
    </Grid>
  );
};

export default Emoji;
