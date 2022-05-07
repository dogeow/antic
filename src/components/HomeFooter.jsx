import Grid from "@mui/material/Grid";
import ExternalLink from "components/ExternalLink";
import PowerBy from "components/PowerBy";
import * as React from "react";
import { Link } from "react-router-dom";
import Record from "resources/svg/beian";

import Heart from "./Heart";

const greenWaveUnderline = {
  textDecorationLine: "underline",
  textDecorationStyle: "wavy",
  textDecorationColor: "green",
};

export default function () {
  return (
    <Grid
      item
      container
      spacing={1}
      justifyContent="center"
      style={{ textAlign: "center", marginBottom: 20 }}
    >
      <Grid item>
        <PowerBy />
      </Grid>
      <Grid item>
        Built By{" "}
        <Link to="/about" style={greenWaveUnderline}>
          小李世界
        </Link>
        {" with "}
        <Heart />
      </Grid>
      <Grid
        container
        justifyContent="center"
        spacing={1}
        style={{ opacity: 0.6 }}
      >
        <Grid item>
          <ExternalLink href={"http://www.beian.gov.cn/"}>
            <img src={Record} alt="" style={{ verticalAlign: "top" }} />
            闽公网安备35020302033650号
          </ExternalLink>
        </Grid>
        <Grid item>
          <ExternalLink href={"https://beian.miit.gov.cn/"}>
            闽ICP备19021694号
          </ExternalLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
