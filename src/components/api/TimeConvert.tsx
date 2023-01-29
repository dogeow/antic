import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { snackState } from "../../states";
import ClipboardButton from "../ClipboardButton";

const TimeConvert = (props: { onOpen: () => void }) => {
  const [value, setValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [, setSnack] = useRecoilState(snackState);

  const getClipboardButton = (value: string) => {
    return <ClipboardButton text={value} handleClick={props.onOpen} />;
  };

  useEffect(() => {
    const newValue = value
      ? /\d{4}-/.test(value)
        ? dayjs(value).unix().toString()
        : dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss")
      : "";
    setToValue(newValue);
  }, [value]);

  return (
    <div>
      <TextField
        variant="standard"
        value={value}
        placeholder={"输入日期时间或时间戳"}
        onChange={(e) => {
          setValue(() => {
            const newValue = e.target.value.replace(/[^\d -:]/g, "");
            if (/[^\d -:]/g.test(e.target.value)) {
              setSnack({
                isOpen: true,
                message: "只能输入 YYYY-MM-DD HH:mm:ss 格式",
              });
            }
            return newValue;
          });
        }}
        InputProps={{
          endAdornment: value !== "" && (
            <InputAdornment position="end">
              <IconButton aria-label="Clear" onClick={() => setValue("")} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
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
