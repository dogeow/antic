import React, {useState, useEffect} from 'react';
import axios from 'axios';

const WeiboAbout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('weibo/about').then((resp) => {
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
