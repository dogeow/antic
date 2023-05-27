import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import imagesLoaded from "imagesloaded";
import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

import { CDN_URL } from "../../config/services";
import faces from "../../resources/face.json";
import { currentPageState, faceIsLoadingState, filteredEmojiListState, searchState } from "../../states";
import Hr from "../display/Hr";
import BootNav from "./BootNav";
import Filter from "./Filter";
import FilterStatistics from "./FilterStatistics";

const Emoji = () => {
  const navigate = useNavigate();
  const filteredFaces = useRecoilValue(filteredEmojiListState);
  const [, setSearch] = useRecoilState(searchState);
  const [faceIsLoading, setFaceIsLoading] = useRecoilState(faceIsLoadingState);
  const [, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    const imgLoad = imagesLoaded("#emoji");
    imgLoad.on("done", () => setFaceIsLoading(false));

    return () => imgLoad.off("done");
  }, [setFaceIsLoading]);

  useMemo(() => {
    return Object.entries(faces).map((item) => {
      item.src = `${CDN_URL}/emoji/${item.fileName}`;
      item.alt = item.fileName;
      return item;
    });
  }, [faces]);

  const handleUpload = useCallback(() => {
    navigate("/emoji/create");
  }, [navigate]);

  const handleSearch = useCallback(() => {
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
  }, [setSearch, setCurrentPage, setFaceIsLoading]);

  return (
    <Grid container>
      <Button variant="contained" onClick={handleSearch}>
        搜索
      </Button>
      <Button variant="contained" color="secondary" onClick={handleUpload} style={{ marginLeft: 20 }}>
        上传
      </Button>
      <Hr />
      <Filter />
      <FilterStatistics />
      <Grid id="emoji" container justifyContent="center" alignItems="flex-end" spacing={2} style={{ marginBottom: 80 }}>
        {filteredFaces.length > 0 ? (
          filteredFaces.map((item) => (
            <Grid key={item.fileName} item xs={4} style={{ textAlign: "center" }}>
              <img id={item.fileName} src={`${CDN_URL}/emoji/${item.fileName}`} alt={item.name} width="100" />
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
      <BootNav />
      <ClipLoader
        loading={faceIsLoading}
        color={"blue"}
        cssOverride={{
          margin: "auto",
          width: "60",
        }}
      />
    </Grid>
  );
};

export default Emoji;
