import { toParams } from "../../helpers";

export default function () {
  const params = toParams(window.location.search.replace(/^\?/, ""));
  window.opener.postMessage({ code: params.code }, import.meta.env.VITE_DOMAIN);
  window.close();

  return null;
}
