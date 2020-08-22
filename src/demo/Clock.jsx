import React, { useEffect, useState } from "react";

const Clock = () => {
  const [data, setDate] = useState(new Date());

  const tick = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {data.toLocaleTimeString()}.</h2>
    </div>
  );
};

export default Clock;
