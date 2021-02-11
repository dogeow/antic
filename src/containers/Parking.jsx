import { gql, useQuery } from "@apollo/client";
import * as React, { useEffect, useState } from "react";

const Parking = () => {
  const [parking, setParking] = useState([]);

  const { data } = useQuery(gql`
    query {
      parking {
        id
        status
      }
    }
  `);

  useEffect(() => {
    data && setParking(data.parking);
  }, [data]);

  return (
    <>
      <div>
        <ul style={{ paddingInlineStart: "inherit" }}>
          {parking.map((item) => (
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
