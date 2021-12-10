import axios from "instance/axios";
import React, { useEffect, useState } from "react";

const WeiboAbout = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios.get("weibo/about").then(({ data }) => {
      setStatistics(data);
    });
  }, []);

  return (
    <div>
      <div>总数：{statistics.total}</div>
      <div>最早：{statistics.startDate}</div>
      <div>目前：{statistics.endDate}</div>
    </div>
  );
};

export default WeiboAbout;
