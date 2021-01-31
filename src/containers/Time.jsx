import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import dayjs from "dayjs";
import React from "react";

import ClipboardButton from "../components/ClipboardButton";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// yesterday, today, tomorrow
// start, now, end
// date, datetime / unixTime

// 今天日期
const todayDate = dayjs().format("YYYY-MM-DD"); // 2020-04-22

// 今天开始
const todayStartDateTime = `${todayDate} 00:00:00`; // 2020-04-22 00:00:00
const todayStartUnixTime = dayjs(todayStartDateTime).unix(); // 1587484800

// 现在
const nowDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
const nowUnixTime = dayjs().unix();

// 今天结束
const todayEndDateTime = dayjs(todayDate)
  .add(86400 - 1, "second")
  .format("YYYY-MM-DD HH:mm:ss");
const todayEndUnixTime = todayStartUnixTime + 86400 - 1;

// 昨天
const yesterdayStartUnix = dayjs(todayStartDateTime).subtract(1, "days").unix();
const yesterdayStartTime = dayjs(todayStartDateTime)
  .subtract(1, "days")
  .format("YYYY-MM-DD HH:mm:ss");
const yesterdayEndUnix = yesterdayStartUnix + 86400 - 1;
const yesterdayEndTime = dayjs(todayStartDateTime)
  .subtract(1, "second")
  .format("YYYY-MM-DD HH:mm:ss");

// 明天
const tomorrowStartUnix = dayjs(todayStartDateTime).add(1, "days").unix();
const tomorrowStartTime = dayjs(todayStartDateTime)
  .add(1, "days")
  .format("YYYY-MM-DD HH:mm:ss");
const tomorrowEndUnix = tomorrowStartUnix + 86400 - 1;
const tomorrowEndTime = dayjs(todayStartDateTime)
  .add(2, "days")
  .subtract(1, "second")
  .format("YYYY-MM-DD HH:mm:ss");

// 这个月
const monthStartDateTime = dayjs()
  .startOf("month")
  .format("YYYY-MM-DD 00:00:00");
const monthStartUnixTime = dayjs(monthStartDateTime).unix();
const monthEndDateTime = dayjs().endOf("month").format("YYYY-MM-DD 23:59:59");
const monthEndUnixTime = dayjs(monthEndDateTime).unix();
// 上月
const lastdayjsStartDateTime = dayjs(monthStartDateTime)
  .subtract(1, "month")
  .format("YYYY-MM-DD HH:mm:ss");
const lastdayjsEndUnixTime = dayjs(lastdayjsStartDateTime).unix();
// 下个月
const nextdayjsStartDateTime = dayjs(monthStartDateTime)
  .add(1, "month")
  .format("YYYY-MM-DD HH:mm:ss");
const nextdayjsEndDateTime = dayjs(nextdayjsStartDateTime).unix();

const Time = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getClipboardButton = (value) => {
    return <ClipboardButton text={value} handleClick={handleClick} />;
  };

  return (
    <div>
      <h2>昨天</h2>
      <div>
        开始时间戳：{yesterdayStartUnix}
        {getClipboardButton(yesterdayStartUnix)}({yesterdayStartTime}
        {getClipboardButton(yesterdayStartTime)})
      </div>
      <div>
        结束时间戳：{yesterdayEndUnix}
        {getClipboardButton(yesterdayEndUnix)}({yesterdayEndTime}
        {getClipboardButton(yesterdayEndTime)})
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
        当前日期时间：{nowDateTime}
        {getClipboardButton(nowDateTime)}
      </div>
      <div>
        当前日期时间戳：{nowUnixTime}
        {getClipboardButton(nowUnixTime)}
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
      <div>
        结束时间戳：{tomorrowEndUnix}
        {getClipboardButton(tomorrowEndUnix)}({tomorrowEndTime}
        {getClipboardButton(tomorrowEndTime)})
      </div>
      <h2>月份 </h2>
      <div>
        本月开始：{monthStartDateTime}
        {getClipboardButton(monthStartDateTime)}（{monthStartUnixTime}
        {getClipboardButton(monthStartUnixTime)}）
      </div>
      <div>
        本月结束：{monthEndDateTime}
        {getClipboardButton(monthEndDateTime)}（{monthEndUnixTime}
        {getClipboardButton(monthEndUnixTime)}）
      </div>
      <div>
        上月开始：{lastdayjsStartDateTime}
        {getClipboardButton(lastdayjsStartDateTime)}（{lastdayjsEndUnixTime}
        {getClipboardButton(lastdayjsEndUnixTime)}）
      </div>
      <div>
        下月开始：{nextdayjsStartDateTime}
        {getClipboardButton(nextdayjsStartDateTime)}（{nextdayjsEndDateTime}
        {getClipboardButton(nextdayjsEndDateTime)}）
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          复制成功
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Time;
