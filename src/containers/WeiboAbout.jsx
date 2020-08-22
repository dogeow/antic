import axios from "axios";
import React, { useEffect, useState } from "react";

const WeiboAbout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("weibo/about").then((resp) => {
      setData(resp.data);
    });
  }, []);

  return (
    <div>
      <div>总数：{data.total}</div>
      <div>最早：{data.startDate}</div>
      <div>目前：{data.endDate}</div>
    </div>
  );
};

export default WeiboAbout;
