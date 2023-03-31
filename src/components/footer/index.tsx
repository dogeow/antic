import Grid from "@mui/material/Grid";
import * as React from "react";

import IcpIcon from "../../resources/svg/ICP";
import ExternalLink from "../link/ExternalLink";
import BuiltBy from "./BuiltBy";
import PowerBy from "./PoweredBy";

export default function Footer() {
  return (
    <Grid item container justifyContent="center" spacing={4} style={{ paddingTop: "2rem" }}>
      <Grid item container justifyContent="center" spacing={2} style={{ opacity: 0.8 }}>
        <Grid item>
          <PowerBy />
        </Grid>
        <Grid item>
          <BuiltBy />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" spacing={2} style={{ opacity: 0.6 }}>
        <Grid item>
          <ExternalLink href={"http://www.beian.gov.cn/"}>
            <img src={IcpIcon} alt="ICP 图标" style={{ display: "inlineBlock", verticalAlign: "middle" }} />
            闽公网安备35020302033650号
          </ExternalLink>
        </Grid>
        <Grid item>
          <ExternalLink href={"https://beian.miit.gov.cn/"}>闽ICP备19021694号</ExternalLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
