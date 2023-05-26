import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Loading from "../components/display/Loading";
import ScrollButton from "../components/display/ScrollButton";
import Search from "../components/Search";
import Settings from "../components/Settings";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import Snack from "../containers/Snack";

export default () => {
  const location = useLocation();

  const isIndex = location.pathname === "/";
  const isNavOrCars = ["/cars"].includes(location.pathname);

  return (
    <Grid
      container
      direction="column"
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* 头部 */}
      <Header />
      {/* 主要内容 */}
      <Container
        maxWidth="lg"
        sx={{
          marginTop: isNavOrCars ? "0" : "2rem",
          flexGrow: 1,
          paddingLeft: isNavOrCars ? "0" : undefined,
          paddingRight: isNavOrCars ? "0" : undefined,
        }}
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      {/* 尾部 */}
      {isIndex && <Footer />}
      {/* 滚动条 */}
      {!isIndex && <ScrollButton />}
      {/* 顶部搜索 */}
      <Search />
      {/* 系统设置 */}
      <Settings />
      {/* 提示 */}
      <Snack />
    </Grid>
  );
};
