import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Chat() {
  const classes = useStyles();

  const [chatBoard, setChatBoard] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  window.Echo.channel("chat").listen(".chat", (e) => {
    setChatBoard([...chatBoard, e.data]);
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

  const handlePost = () => {
    setChatBoard([...chatBoard, content]);
    axios.post(
      "/chat",
      {
        message: content.message,
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
    setContent({
      name: localStorage.userName,
      message: e.target.value,
    });
  };

  return (
    <Paper elevation={3} style={{ marginTop: 40 }}>
      <Grid container style={{ padding: 20 }}>
        <Grid item xs={12}>
          {chatBoard.length
            ? chatBoard.map((content, index) => (
                <div key={index}>
                  {content.name}: {content.message}
                </div>
              ))
            : "无聊天内容"}
        </Grid>
        <Grid item xs={12}>
          <InputBase
            className={classes.input}
            placeholder="输入聊天内容..."
            inputProps={{ "aria-label": "输入聊天内容" }}
            onChange={handleChange}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="发送信息"
            onClick={handlePost}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          message={alertMessage}
          onClose={handleClose}
        />
      </Grid>
    </Paper>
  );
}
