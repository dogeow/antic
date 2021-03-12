import * as React from "react";

import Record from "../resources/beian";
import Heart from "./Heart";

export default function () {
  return (
    <div style={{ textAlign: "center", marginBottom: 20, opacity: 0.6 }}>
      <div>
        <a href="http://www.beian.gov.cn/" target="_blank" rel="noreferrer">
          <img src={Record} alt="" style={{ verticalAlign: "top" }} />
          闽公网安备 35020302033650号
        </a>
        {" | "}
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          闽ICP备19021694号
        </a>
      </div>
      <div>
        Built By 小李世界 with <Heart />
      </div>
    </div>
  );
}
