import React, { useEffect, useState } from "react";

interface ExpireProps {
  // 过期时间，单位毫秒
  delay: number;
  // 文本内容
  children: string;
}

const Expire = (props: ExpireProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const visibleTimer = setTimeout(() => {
      setVisible(false);
    }, props.delay);

    return () => clearTimeout(visibleTimer);
  }, [props.delay]);

  return visible ? <span>{props.children}</span> : <></>;
};

export default Expire;
