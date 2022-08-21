import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default () => {
  useEffect(() => {
    console.log(dayjs().toString());
  }, []);

  return <div>Test</div>;
};
