import Input from "@mui/material/Input";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";

import ClipboardButton from "../ClipboardButton";

const TimeConvert = (props) => {
  const [value, setValue] = useState("");
  const [toValue, setToValue] = useState("");

  const getClipboardButton = (value) => {
    return <ClipboardButton text={value} handleClick={props.onOpen} />;
  };

  useEffect(() => {
    setToValue(
      value
        ? /\d{4}-/.test(value)
          ? dayjs(value).unix().toString()
          : dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss")
        : ""
    );
  }, [value]);

  return (
    <div>
      <Input
        placeholder={"输入日期时间或时间戳"}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^\d -:]/g, "");
          setValue(e.target.value);
        }}
      />
      <span>
        {" => "}
        {value === "" && "?"}
        {toValue}
      </span>
      {toValue && getClipboardButton(toValue)}
    </div>
  );
};

export default TimeConvert;
