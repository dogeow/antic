import Input from "@mui/material/Input";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";

const TimeConvert = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <span>
        {" => "}
        {value
          ? /\d{4}-/.test(value)
            ? dayjs(value).unix()
            : dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss")
          : ""}
      </span>
    </div>
  );
};

export default TimeConvert;
