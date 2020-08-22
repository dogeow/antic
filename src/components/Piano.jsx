import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";

const Piano = () => {
  const styles = {
    width: "100%",
    height: "666px",
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography>
          <span style={{ color: "red" }}>
            移步到
            <a
              href="https://www.autopiano.cn/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              自由钢琴 https://www.autopiano.cn/
            </a>
          </span>
          <span style={{ marginLeft: 20 }}>
            或直接进入
            <a
              href="https://www.autopiano.cn/post/181"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              D大调卡农
            </a>
            （⚠️请手动切换到原声钢琴）
          </span>
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <embed src="/medias/paino.swf" style={styles} />
      </Grid>

      <Grid item xs={4}>
        <h1>E调《卡农》修改版</h1>
        <pre>{`
低音 中音 高音 超高
abcdefg hijklmn opqrstu vwxyz
注：括号是指音符同时按，即和弦

q---p---o---n---m---l---m---n

(hq)-q--(ep)-p--(of)-o--[nc]-n--
[md]-m--[la]-l--[md]-m--[ne]-n

h-jlo e-iln f-hjm c-gil
d-fhk a-ehj d-fhk e-gil

(hq)-jlo (ep)-gil (of)-hjm (nc)-gjl
(md)-fhk (la)-ceh (md)-fhk (ne)-gil

(hq)--(ep)--(of)--[nc]--
[md]--[la]--[md]--[ne]

onoh (gb)lij (ch)onm (cn)qst
(dr)qpr (qa)pon (dm)lkj (ei)kji
(eh)ijk (eg)ilk (fj)mlk (cl)kji
(dh)fmn (ao)nml (dk)jim lmn

(sj)-qrs-qr(se)lmnopqr
(fq)-opq-jk(gl)mlkljklm
(fk)-mlk-ji(je)ihijklm
(fk)-mlm-no(gl)mnopqrs
(si)-qrs-qr(se)lmnopqr
(fq)-opq-jk(gl)mlkljklm
(fk)-mlk-ji(ej)ihijklm
(fk)-mlm-no(gl)mnopqrs

(hq)-jlo (ep)-gil (of)-hjm (nc)-
gjl (md)-fhk (la)-ceh (md)-fhk

(ne)-o-(oh)--l--o--p-z-q--s--v
	            `}</pre>
      </Grid>
    </Grid>
  );
};

export default Piano;
