import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { mdiSend } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import _ from "lodash";
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
  const [message, setMessage] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [peoples, setPeoples] = React.useState([]);

  window.Echo.channel("chat").listen(".chat", (e) => {
    setChatBoard([...chatBoard, e.data]);
  });

  window.Echo.join("chat")
    .here((user) => {
      setPeoples([...peoples, ...user]);
      setAlertMessage(`${_.map(user, "name")} 正在房间`);
      setOpen(true);
    })
    .joining((user) => {
      setPeoples([...peoples, user]);
      setAlertMessage(`${user.name} 加入了房间`);
      setOpen(true);
    })
    .leaving((user) => {
      _.remove(peoples, { id: user.id });
      setPeoples(peoples);
      setAlertMessage(`${user.name} 退出了房间`);
      setOpen(true);
    });

  const socketId = window.Echo.socketId();

  const handlePost = () => {
    if (message === "") {
      return;
    }
    setChatBoard([
      ...chatBoard,
      {
        name: localStorage.userName,
        message,
      },
    ]);
    axios.post(
      "/chat",
      {
        message,
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
    setMessage(e.target.value);
  };

  return (
    <Paper elevation={3} style={{ marginTop: 40, height: "80vh" }}>
      <Grid container style={{ padding: 20 }} spacing={1}>
        <Grid item xs={9}>
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
            <TextField
              label="发送信息"
              variant="standard"
              onChange={handleChange}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="发送信息"
              onClick={handlePost}
            >
              <Icon path={mdiSend} size={1} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: "rgba(0, 0, 0, 0.1)",
            borderLeftStyle: "solid",
          }}
        >
          {peoples.map((people) => (
            <div key={people.id}>{people.name}</div>
          ))}
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
