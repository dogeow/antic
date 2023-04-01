import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Loading from "../components/display/Loading";
import ScrollButton from "../components/display/ScrollButton";
import Search from "../components/Search";
import Settings from "../components/Settings";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import Snack from "../containers/Snack";

const useStyles = makeStyles({
  app: {
    minHeight: "100vh",
  },
  // 适合展示
  other: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  main: {
    marginTop: "2rem",
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();
  const location = useLocation();

  const isIndex = location.pathname === "/";
  const isNotIndex = !isIndex;
  const isNavOrCars = ["/cars"].includes(location.pathname);

  return (
    <Grid container direction="column" className={classes.app}>
      {/* 头部 */}
      <Header />
      {/* 主要内容 */}
      <Container maxWidth="lg" classes={isNavOrCars ? { root: classes.other } : { root: classes.main }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      {/* 尾部 */}
      {isIndex && <Footer />}
      {/* 滚动条 */}
      {isNotIndex && <ScrollButton />}
      {/* 顶部搜索 */}
      <Search />
      {/* 系统设置 */}
      <Settings />
      {/* 提示 */}
      <Snack />
    </Grid>
  );
};
