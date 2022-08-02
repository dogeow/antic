import "../../styles/base64.css";

import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import ClipboardButton from "../../components/ClipboardButton";
import { snackMessageState } from "../../states";

export default function () {
  const [base64Str, setBase64St] = useState("");
  const [snackMessage, setSnackMessage] = useRecoilState(snackMessageState);

  const handleClick = () => {
    setSnackMessage("复制成功");
  };

  const load = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64St(e.target.result);
      document
        .getElementById("empty")
        .insertAdjacentHTML(
          "afterBegin",
          '<textarea style="width:100%;height:100%;">' +
            e.target.result +
            "</textarea>"
        );
      document.getElementById("empty").classList.remove("empty");
    };
    reader.readAsDataURL(event.dataTransfer.files[0]);
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener(
      "dragenter",
      (event) => {
        event.preventDefault();
      },
      false
    );

    window.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
      },
      false
    );

    window.addEventListener("drop", load, false);

    return () => {
      window.removeEventListener(
        "dragenter",
        (event) => {
          event.preventDefault();
        },
        false
      );

      window.removeEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
        },
        false
      );

      window.removeEventListener("drop", load, false);
    };
  }, []);

  return (
    <Grid
      container
      direction="row"
      spacing={1}
      style={{ height: "calc(100vh - 120px)" }}
    >
      <Grid item xs={12}>
        <ClipboardButton text={base64Str} handleClick={handleClick} />
      </Grid>
      <Grid
        xs={12}
        id="empty"
        item
        className="empty"
        style={{ height: "100%" }}
      />
    </Grid>
  );
}
