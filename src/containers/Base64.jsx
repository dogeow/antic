import "../styles/base64.css";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { snackMessage } from "../actions";
import ClipboardButton from "../components/ClipboardButton";

export default function () {
  const dispatch = useDispatch();
  const [base64Str, setBase64St] = useState("");

  const handleClick = () => {
    dispatch(snackMessage("复制成功"));
  };

  const load = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64St(e.target.result);
      document
        .getElementById("empty")
        .insertAdjacentHTML("afterBegin", "<p>" + e.target.result + "</p>");
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
    <>
      <ClipboardButton text={base64Str} handleClick={handleClick} />
      <div id="empty" className="empty" />
    </>
  );
}
