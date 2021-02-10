import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [chatBoard, setChatBoard] = useState([]);
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [peoples, setPeoples] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const messagesEndRef = useRef(null);

  window.Echo.join("chat")
    .here((user) => {
      setPeoples(_.uniqBy([...peoples, ...user], "id"));
      setAlertMessage(`${_.map(user, "name")} 正在房间`);
      setAlertOpen(true);
    })
    .joining((user) => {
      setPeoples([...peoples, user]);
      setAlertMessage(`${user.name} 加入了房间`);
      setAlertOpen(true);
    })
    .leaving((user) => {
      _.remove(peoples, { id: user.id });
      setPeoples(peoples);
      setAlertMessage(`${user.name} 退出了房间`);
      setAlertOpen(true);
    })
    .listen(".chat", (e) => {
      setChatBoard([...chatBoard, e.data]);
    });

  const socketId = window.Echo.socketId();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatBoard]);

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
    setMessage("");
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

    setAlertOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <Grid container alignItems="stretch">
        <Grid item xs={9} container direction="column">
          <Grid
            item
            container
            ref={messagesEndRef}
            style={{ overflowY: "scroll", height: "10vh" }}
          >
            {chatBoard.length
              ? chatBoard.map((content, index) => (
                  <Grid item xs={12} key={index}>
                    {content.name}: {content.message}
                  </Grid>
                ))
              : "无聊天内容"}
          </Grid>
          <Grid item>
            <TextField
              label="发送信息"
              value={message}
              fullWidth
              variant="standard"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" onClick={handlePost}>
                    <SendIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: "rgba(0, 0, 0, 0.1)",
            borderLeftStyle: "solid",
            paddingLeft: 8,
          }}
        >
          {peoples.map((people) => (
            <div key={people.id}>{people.name}</div>
          ))}
        </Grid>
      </Grid>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        message={alertMessage}
        onClose={handleClose}
      />
    </>
  );
}
