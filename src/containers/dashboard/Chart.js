import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import Title from './Title'
import axios from 'axios';

export default function Chart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('site_check')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  return (
    <>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="humans"/>
          <YAxis ticks={[0, 1]}>
            <Label angle={270} position="left" style={{textAnchor: 'middle'}}>
              状态
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="status" stroke="#556CD6" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
