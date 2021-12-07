import Link from "@material-ui/core/Link";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => {
        navigate("/login");
      }}
      variant="body2"
      color="secondary"
    >
      已有账号？登录！
    </Link>
  );
}
