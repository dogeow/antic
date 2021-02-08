import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import React from "react";

export default function Chat() {
  const [content, setContent] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  window.Echo.channel("chat").listen(".chat", (e) => {
    setContent([...content, e.message]);
  });

  window.Echo.join("chat")
    .here((user) => {
      setAlertMessage(`${user} 正在房间`);
      setOpen(true);
    })
    .joining((user) => {
      setAlertMessage(`${user} 加入了房间`);
      setOpen(true);
    })
    .leaving((user) => {
      setAlertMessage(`${user} 退出了房间`);
      setOpen(true);
    });

  const socketId = window.Echo.socketId();

  const handlePost = (e) => {
    setContent([...content, message]);
    axios.post(
      "/chat",
      {
        message: message,
      },
      {
        headers: {
          "X-Socket-ID": socketId,
        },
      }
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    const message = e.target.value;
    setMessage(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {content.length
          ? content.map((item, index) => <div key={index}>{item}</div>)
          : "无聊天内容"}
      </Grid>
      <Grid item xs={12}>
        <input type="text" onChange={handleChange} />
        <button onClick={handlePost}>发送</button>
      </Grid>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        message={alertMessage}
        onClose={handleClose}
      />
    </Grid>
  );
}
