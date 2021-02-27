import React, { useEffect, useState } from "react";

const Expire = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const visibleTimer = setTimeout(() => {
      setVisible(false);
    }, props.delay);

    return () => clearTimeout(visibleTimer);
  }, [props.delay]);

  return visible && <span>{props.children}</span>;
};

export default Expire;
