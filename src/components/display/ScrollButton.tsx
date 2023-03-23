import React, { useState } from "react";

import { CDN_URL } from "../../config/services";

const scrollHeight = 500;
const defaultBottom = -200;
const displayBottom = 40;

const ScrollButton = () => {
  const [bottom, setBottom] = useState(defaultBottom);
  const [delay, setDelay] = useState("1.5s");

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > scrollHeight) {
      setBottom(displayBottom);
      setDelay("1.5s");
    } else if (scrolled <= scrollHeight) {
      setBottom(defaultBottom);
      setDelay("3s");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
        in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom,
        outline: "none",
        transition: `bottom ${delay}`,
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      <img src={`${CDN_URL}/bfr.png`} width="24" alt="Back to top arrow" onClick={scrollToTop} />
    </div>
  );
};

export default ScrollButton;
