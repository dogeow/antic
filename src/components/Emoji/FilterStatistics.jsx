import Grid from "@mui/material/Grid";
import * as React from "react";

const FilterStatistics = (props) => {
  const { filterNum, currentPage, pageLimit } = props;

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      style={{ marginTop: 5, marginBottom: 1 }}
    >
      筛选结果：共 {filterNum} 张，共 {Math.ceil(filterNum / pageLimit)}{" "}
      页，当前第 {currentPage} 页。
    </Grid>
  );
};

export default FilterStatistics;
