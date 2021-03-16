import React from "react";

import { toParams } from "../helpers";

export default function () {
  const params = toParams(window.location.search.replace(/^\?/, ""));
  window.opener.postMessage(
    { token: params.token },
    "http://192.168.0.102:3000"
  );
  window.close();
}
