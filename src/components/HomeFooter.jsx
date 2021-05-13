import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { Link } from "react-router-dom";

import ExternalLink from "../components/ExternalLink";
import PowerBy from "../components/PowerBy";
import Record from "../resources/svg/beian";
import Heart from "./Heart";

export default function () {
  return (
    <Grid
      container
      spacing={1}
      justify="center"
      style={{ textAlign: "center", marginBottom: 20, opacity: 0.6 }}
    >
      <Grid item>
        <ExternalLink url={"http://www.beian.gov.cn/"}>
          <img src={Record} alt="" style={{ verticalAlign: "top" }} />
          闽公网安备35020302033650号
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink url={"https://beian.miit.gov.cn/"}>
          闽ICP备19021694号
        </ExternalLink>
      </Grid>
      <Grid item>
        <PowerBy />
      </Grid>
      <Grid item>
        Built By{" "}
        <Link
          to="/about"
          style={{
            textDecorationLine: "underline",
            textDecorationStyle: "wavy",
            textDecorationColor: "green",
          }}
        >
          小李世界
        </Link>
        {" with "}
        <Heart />
      </Grid>
    </Grid>
  );
}
