import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { Link } from "react-router-dom";

import Used from "../components/Used";
import Record from "../resources/beian";
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
        <a href="http://www.beian.gov.cn/" target="_blank" rel="noreferrer">
          <img src={Record} alt="" style={{ verticalAlign: "top" }} />
          闽公网安备 35020302033650号
        </a>
      </Grid>
      <Grid item>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          闽ICP备19021694号
        </a>
      </Grid>
      <Grid item>
        <Used />
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
