import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

type Park = {
  id: number;
  status: boolean;
};

const Parking = () => {
  const [parks, setParks] = useState([]);

  const { data } = useQuery(gql`
    query {
      parking {
        id
        status
      }
    }
  `);

  useEffect(() => {
    data && setParks(data.parking);
  }, [data]);

  return (
    <>
      <div>
        <ul style={{ paddingInlineStart: "inherit" }}>
          {parks.map((park: Park) => (
            <li key={park.id} style={{ color: park.status ? "green" : "red" }}>
              {park.id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <a href="https://www.cheboyi.com/wap/index/park22/14926" target="'_blank">
          或者直接打开
        </a>
      </div>
    </>
  );
};

export default Parking;
