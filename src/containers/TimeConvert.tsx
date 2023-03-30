import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import ClipboardButton from "../components/ClipboardButton";
import { snackState } from "../states";

const useStyles = makeStyles({
  arrowTextWrapper: {
    lineHeight: "56px",
    "&::before": {
      content: '"=> "',
    },
  },
});

const TimeConvert = () => {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [, setSnack] = useRecoilState(snackState);

  const handleClick = () => {
    setSnack({
      message: "复制成功",
    });
  };

  const getClipboardButton = (value: string) => {
    return <ClipboardButton text={value} handleClick={handleClick} />;
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
    <Grid container spacing={1}>
      <Grid item xs={12} md="auto">
        <TextField
          value={value}
          placeholder={"输入日期时间或时间戳"}
          onChange={(e) => {
            setValue(() => {
              const newValue = e.target.value.replace(/[^\d -:]/g, "");
              if (/[^\d -:]/g.test(e.target.value)) {
                setSnack({
                  severity: "warning",
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
      </Grid>
      <Grid item xs={12} md={6} className={classes.arrowTextWrapper}>
        <span>{toValue || "?"}</span>
        {toValue && getClipboardButton(toValue)}
      </Grid>
    </Grid>
  );
};

export default TimeConvert;
