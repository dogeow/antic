import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Echo from "laravel-echo";
import _ from "lodash";
import React, { useMemo, useRef, useState } from "react";

import Loading from "../components/Loading";
import axios from "../instance/axios";

let timer = null;

export default function Chat({
  lab,
  chat,
  addPeople,
  addPeoples,
  chatBoardAdd,
  deletePeople,
}) {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(window?.Echo?.socketId() === null);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);
  const peoplesRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useMemo(() => {
    window.Echo = new Echo({
      broadcaster: "socket.io",
      host: window.location.hostname + ":6001",
      auth: {
        headers: {
          Authorization: lab.token,
        },
      },
    });

    window.Echo.join("chat")
      .here((user) => {
        setLoading(false);
        addPeoples(user);
        setAlertMessage(`${_.map(user, "name")} 正在房间`);
        setAlertOpen(true);
      })
      .joining((user) => {
        addPeople(user);
        setAlertMessage(`${user.name} 加入了房间`);
        setAlertOpen(true);
      })
      .leaving((user) => {
        deletePeople(user);
        setAlertMessage(`${user.name} 退出了房间`);
        setAlertOpen(true);
      });

    let typingTime;

    window.Echo.private("chat").listenForWhisper("typing", (e) => {
      if (peoplesRef.current) {
        peoplesRef.current.innerText = peoplesRef.current.innerText.replace(
          new RegExp(e.name, "g"),
          `${e.name} 输入中...`
        );
      }

      if (peoplesRef.current) {
        typingTime = setTimeout(() => {
          peoplesRef.current.innerText = peoplesRef.current.innerText.replace(
            /输入中\.\.\./,
            ""
          );
        }, 3000);
      }
    });

    window.Echo.private("chat").listen(".chat", (e) => {
      chatBoardAdd(e.data);
    });

    scrollToBottom();

    return () => {
      if (typingTime) {
        clearTimeout(typingTime);
      }
      window.Echo.private("chat").stopListeningForWhisper("typing");
      window.Echo.leave("chat");
      window.Echo.private("chat").stopListening(".chat");
    };
  }, [addPeople, addPeoples, chatBoardAdd, deletePeople, lab.token]);

  const handlePost = () => {
    if (message === "") {
      return;
    }
    chatBoardAdd({
      name: localStorage.userName,
      message,
    });
    axios.post(
      "/chat",
      {
        message,
      },
      {
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
      }
    );
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePost();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleChange = (e) => {
    clearTimeout(timer);
    setMessage(e.target.value);
    timer = setTimeout(triggerChange, 2000);
  };

  const triggerChange = () => {
    window.Echo.private("chat").whisper("typing", {
      name: localStorage.userName,
    });
  };

  return (
    <>
      <Loading open={loading} />
      <Grid
        container
        alignItems="stretch"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Grid item xs={9} container direction="column">
          <Grid
            item
            container
            ref={messagesEndRef}
            alignItems="flex-start"
            alignContent="flex-start"
            style={{ overflowY: "auto", height: "60vh" }}
          >
            {chat.chatBoard.length
              ? chat.chatBoard.map((content, index) => (
                  <Grid item xs={12} key={index}>
                    {content.name}: {content.message}
                  </Grid>
                ))
              : "说点什么吧"}
          </Grid>
          <Grid item>
            <TextField
              label="发送信息"
              value={message}
              fullWidth
              variant="standard"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
          ref={peoplesRef}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: "rgba(0, 0, 0, 0.1)",
            borderLeftStyle: "solid",
            paddingLeft: 8,
          }}
        >
          {chat.peoples.map((people) => (
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
