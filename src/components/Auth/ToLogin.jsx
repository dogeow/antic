import Link from "@material-ui/core/Link";
import React from "react";
import { useHistory } from "react-router-dom";

export default function () {
  const history = useHistory();

  return (
    <Link
      onClick={() => {
        history.push("/login");
      }}
      variant="body2"
      color="secondary"
    >
      已有账号？登录！
    </Link>
  );
}
