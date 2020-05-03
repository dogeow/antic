import React from "react";
import moment from "moment";
import ClipboardButton from "../components/ClipboardButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// 今天
const today = moment().format("YYYY-MM-DD"); // 2020-04-22
const todayTime = moment(today).format("YYYY-MM-DD HH:mm:ss"); // 2020-04-22 00:00:00
const todayUnix = moment(todayTime).unix(); // 1587484800
const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
const nowUnix = moment().unix();
const todayEndTime = moment(today)
  .add(86400 - 1, "second")
  .format("YYYY-MM-DD HH:mm:ss");
const todayEndUnix = todayUnix + 86400 - 1;

// 昨天
const yesterdayStartUnix = moment(todayTime).subtract(1, "days").unix();
const yesterdayStartTime = moment(todayTime)
  .subtract(1, "days")
  .format("YYYY-MM-DD HH:mm:ss");
const yesterdayEndUnix = yesterdayStartUnix + 86400 - 1;
const yesterdayEndTime = moment(todayTime)
  .subtract(1, "second")
  .format("YYYY-MM-DD HH:mm:ss");

//明天
const tomorrowStartUnix = moment(todayTime).add(1, "days").unix();
const tomorrowStartTime = moment(todayTime)
  .add(1, "days")
  .format("YYYY-MM-DD HH:mm:ss");
const tomorrowEndUnix = tomorrowStartUnix + 86400 - 1;
const tomorrowEndTime = moment(todayTime)
  .add(2, "days")
  .subtract(1, "second")
  .format("YYYY-MM-DD HH:mm:ss");

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
        开始时间：{todayTime}
        {getClipboardButton(todayTime)}
      </div>
      <div>
        开始时间戳：{todayUnix}
        {getClipboardButton(todayUnix)}
      </div>
      <div>
        当前日期时间：{nowTime}
        {getClipboardButton(nowTime)}
      </div>
      <div>
        当前日期时间戳：{nowUnix}
        {getClipboardButton(nowUnix)}
      </div>
      <div>
        结束时间：{todayEndTime}
        {getClipboardButton(todayEndTime)}
      </div>
      <div>
        结束时间戳：{todayEndUnix}
        {getClipboardButton(todayEndUnix)}
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
