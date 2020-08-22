import axios from "axios";
import React, { useEffect, useState } from "react";

const Parking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("parking").then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <div>
        <ul style={{ paddingInlineStart: "inherit" }}>
          {data.map((item) => (
            <li key={item.id} style={{ color: item.status ? "green" : "red" }}>
              {item.id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <a
          href="https://www.cheboyi.com/wap/index/park22/14926"
          target="'_blank"
        >
          或者直接打开
        </a>
      </div>
    </>
  );
};

export default Parking;
