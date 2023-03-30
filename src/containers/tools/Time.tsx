import { Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import dayjs from "dayjs";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import ClipboardButton from "../../components/ClipboardButton";
import Hr from "../../components/display/Hr";
import { snackState } from "../../states";
import TimeConvert from "../TimeConvert";

const fullFormat = "YYYY-MM-DD HH:mm:ss";

// 今天开始
const todayStartDateTime = dayjs().startOf("day").format(fullFormat); // 2020-04-22 00:00:00
const todayStartUnixTime = dayjs().startOf("day").unix(); // 1587484800

// 今天结束
const todayEndDateTime = dayjs().endOf("day").format(fullFormat);
const todayEndUnixTime = dayjs().endOf("day").unix();

// 昨天
const yesterdayStartUnix = dayjs(todayStartDateTime).subtract(1, "days").unix();
const yesterdayStartTime = dayjs(todayStartDateTime).subtract(1, "days").format(fullFormat);

// 明天
const tomorrowStartUnix = dayjs(todayStartDateTime).add(1, "days").unix();
const tomorrowStartTime = dayjs(todayStartDateTime).add(1, "days").format(fullFormat);

// 这个月
const monthStartDateTime = dayjs().startOf("month").format("YYYY-MM-DD 00:00:00");
const monthStartUnixTime = dayjs(monthStartDateTime).unix();
// 上月
const lastDayStartDateTime = dayjs(monthStartDateTime).subtract(1, "month").format(fullFormat);
const lastDayEndUnixTime = dayjs(lastDayStartDateTime).unix();
// 下个月
const nextDayStartDateTime = dayjs(monthStartDateTime).add(1, "month").format(fullFormat);
const nextDayEndDateTime = dayjs(nextDayStartDateTime).unix();

const Time = () => {
  const [nowDateTime, setNowDateTime] = useState("");
  const [nowUnixTime, setNowUnixTime] = useState("");
  const [, setSnack] = useRecoilState(snackState);

  useEffect(() => {
    setInterval(() => {
      setNowDateTime(dayjs().format(fullFormat));
      setNowUnixTime(dayjs().unix());
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  const handleClick = () => {
    setSnack({
      message: "复制成功",
    });
  };

  const getClipboardButton = (value) => {
    return <ClipboardButton text={value} handleClick={handleClick} />;
  };

  return (
    <div>
      <h2>转换</h2>
      <TimeConvert />
      <Hr style={{ marginTop: 20 }} />
      <Grid container spacing={1} justifyItems={""}>
        <Grid item>
          <h2>现在</h2>
          <div>
            当前日期时间：{nowDateTime}
            {getClipboardButton(nowDateTime)}
          </div>
          <div>
            当前日期时间戳：{nowUnixTime}
            {getClipboardButton(nowUnixTime)}
          </div>
          <h2>昨天</h2>
          <div>
            开始时间戳：{yesterdayStartUnix}
            {getClipboardButton(yesterdayStartUnix)}({yesterdayStartTime}
            {getClipboardButton(yesterdayStartTime)})
          </div>
          <h2>今天</h2>
          <div>
            开始时间：{todayStartDateTime}
            {getClipboardButton(todayStartDateTime)}
          </div>
          <div>
            开始时间戳：{todayStartUnixTime}
            {getClipboardButton(todayStartUnixTime)}
          </div>
          <div>
            结束时间：{todayEndDateTime}
            {getClipboardButton(todayEndDateTime)}
          </div>
          <div>
            结束时间戳：{todayEndUnixTime}
            {getClipboardButton(todayEndUnixTime)}
          </div>
          <h2>明天</h2>
          <div>
            开始时间戳：{tomorrowStartUnix}
            {getClipboardButton(tomorrowStartUnix)}({tomorrowStartTime}
            {getClipboardButton(tomorrowStartTime)})
          </div>
        </Grid>
        <Grid item>
          <h2>月份 </h2>
          <div>
            上月开始：{lastDayStartDateTime}
            {getClipboardButton(lastDayStartDateTime)}（{lastDayEndUnixTime}
            {getClipboardButton(lastDayEndUnixTime)}）
          </div>
          <div>
            本月开始：{monthStartDateTime}
            {getClipboardButton(monthStartDateTime)}（{monthStartUnixTime}
            {getClipboardButton(monthStartUnixTime)}）
          </div>
          <div>
            下月开始：{nextDayStartDateTime}
            {getClipboardButton(nextDayStartDateTime)}（{nextDayEndDateTime}
            {getClipboardButton(nextDayEndDateTime)}）
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Time;
