import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Parking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('parking')
      .then(response => {
        setData(response.data);
      })
  }, []);

  return (
    <>
      <div>
        <ul style={{paddingInlineStart: 'inherit'}}>
          {
            data.map((item, index) => (
              <li style={{color: item.status ? 'green' : 'red'}} key={index}>{item.id}</li>
            ))
          }
        </ul>
      </div>
      <div>
        <a href="https://www.cheboyi.com/wap/index/park22/14926" target="'_blank">或者直接打开</a>
      </div>
    </>
  )
};

export default Parking;
