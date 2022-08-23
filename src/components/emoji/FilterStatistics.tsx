import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { currentPageState, filteredEmojiListState, pageLimitState } from "../../states";

const FilterStatistics = () => {
  const [currentPage] = useRecoilState(currentPageState);
  const [pageLimit] = useRecoilState(pageLimitState);
  const filteredFaces = useRecoilValue(filteredEmojiListState);

  return (
    <Grid container spacing={0} justifyContent="center" style={{ marginTop: 5, marginBottom: 1 }}>
      筛选结果：共 {filteredFaces.length} 张，共 {Math.ceil(filteredFaces.length / pageLimit)} 页，当前第 {currentPage}{" "}
      页。
    </Grid>
  );
};

export default FilterStatistics;
