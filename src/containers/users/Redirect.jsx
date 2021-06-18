import { toParams } from "../../helpers";

export default function () {
  const params = toParams(window.location.search.replace(/^\?/, ""));
  window.opener.postMessage(
    { code: params.code },
    process.env.REACT_APP_DOMAIN
  );
  window.close();
}
