import Grid from "@mui/material/Grid";
import * as React from "react";

import IcpIcon from "../../resources/svg/ICP";
import ExternalLink from "../link/ExternalLink";
import BuiltBy from "./BuiltBy";
import PowerBy from "./PoweredBy";

const BEIAN_URL = "http://www.beian.gov.cn/";
const MIIT_URL = "https://beian.miit.gov.cn/";

const styles = {
  container: { paddingTop: "2rem" },
  opacityLow: { opacity: 0.8 },
  opacityHigh: { opacity: 0.6 },
  link: { display: "inline-block", verticalAlign: "middle" },
};

export default function Footer() {
  return (
    <Grid item container justifyContent="center" spacing={4} sx={styles.container}>
      <Grid item container justifyContent="center" spacing={2} sx={styles.opacityLow}>
        <Grid item>
          <PowerBy />
        </Grid>
        <Grid item>
          <BuiltBy />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" spacing={2} sx={styles.opacityHigh}>
        <Grid item>
          <ExternalLink href={BEIAN_URL}>
            <img src={IcpIcon} alt="ICP 图标" style={styles.link} />
            闽公网安备35020302033650号
          </ExternalLink>
        </Grid>
        <Grid item>
          <ExternalLink href={MIIT_URL}>闽ICP备19021694号</ExternalLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
