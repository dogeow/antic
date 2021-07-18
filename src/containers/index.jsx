import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles(() => ({
  "@global": {
    "#project a": {
      display: "block",
    },
    "#project a:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  },
}));

const Index = () => {
  useStyles();

  return (
    <>
      <Grid item xs={12}>
        <img
          src={`${process.env.REACT_APP_CDN_URL}/logo/Laravel-name.svg`}
          style={{ width: 220 }}
        />
      </Grid>
      <Grid item xs={12}>
        <img
          src={`${process.env.REACT_APP_CDN_URL}/logo/React-name.svg`}
          style={{ width: 220 }}
        />
      </Grid>
      <Grid item xs={12}>
        <img
          src={`${process.env.REACT_APP_CDN_URL}/logo/Docker.svg`}
          style={{ width: 100 }}
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </>
  );
};

export default Index;
