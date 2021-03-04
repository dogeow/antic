import "../styles/base64.css";

import React, { useEffect } from "react";

export default function () {
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

    window.addEventListener(
      "drop",
      (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          document
            .getElementById("empty")
            .insertAdjacentHTML("afterBegin", "<p>" + e.target.result + "</p>");
          document.getElementById("empty").classList.remove("empty");
        };
        reader.readAsDataURL(event.dataTransfer.files[0]);
        event.preventDefault();
      },
      false
    );

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

      window.removeEventListener(
        "drop",
        (event) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            document
              .getElementById("empty")
              .insertAdjacentHTML(
                "afterBegin",
                "<p>" + e.target.result + "</p>"
              );
            document.getElementById("empty").classList.remove("empty");
          };
          reader.readAsDataURL(event.dataTransfer.files[0]);
          event.preventDefault();
        },
        false
      );
    };
  }, []);

  return <div id="empty" className="empty" />;
}
