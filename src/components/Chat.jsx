import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  addPeople,
  addPeoples,
  chatBoard,
  deletePeople,
  loginAction,
} from "actions";
import Avatar from "components/gravatar";
import Loading from "components/Loading";
import axios from "instance/axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

import Expire from "./Expire";

let timer = null;

export default function Chat() {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const lab = useSelector((state) => state.lab);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(window?.Echo?.socketId() === null);
  const [typing, setTyping] = useState(undefined);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const messagesEndRef = useRef(null);
  const peoplesRef = useRef(null);

  const [open, setOpen] = useState(lab.token === null);

  const toggleError = () => {
    setError(!error);
  };

  const handleToggleInputFocus = (value) => {
    setInputFocus(value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (lab.token === null) {
      setOpen(true);
      return;
    }

    let typingTime;

    window.Echo.options.auth.headers.Authorization = lab.token;

    window.Echo.join("chat")
      .here((user) => {
        setLoading(false);
        dispatch(addPeoples(user));
        setAlertMessage(`${_.map(user, "name")} 正在房间`);
        setAlertOpen(true);
      })
      .joining((user) => {
        addPeople(user);
        setAlertMessage(`${user.name} 加入了房间`);
        setAlertOpen(true);
      })
      .leaving((user) => {
        dispatch(deletePeople(user));
        setAlertMessage(`${user.name} 退出了房间`);
        setAlertOpen(true);
      });

    window.Echo.private("chat").listenForWhisper("typing", (e) => {
      setTyping(undefined);
      setTyping(e.id);
    });

    window.Echo.private("chat").listen(".chat", (e) => {
      dispatch(chatBoard(e.data));
    });

    return () => {
      window.Echo.private("chat").stopListeningForWhisper("typing");
      window.Echo.private("chat").stopListening(".chat");
      window.Echo.leave("chat");
      if (typingTime) {
        clearTimeout(typingTime);
      }
    };
  }, [dispatch, lab.token]);

  useEffect(() => {
    scrollToBottom();
  }, [chat.chatBoard]);

  const handlePost = () => {
    if (message === "") {
      return;
    }

    dispatch(
      chatBoard({
        id: localStorage.userId,
        name: localStorage.userName,
        message,
      })
    );

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
    timer = setTimeout(triggerChange, 500);
  };

  const triggerChange = () => {
    window.Echo.private("chat").whisper("typing", {
      id: parseInt(localStorage.userId),
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            margin="dense"
            id="name"
            label="昵称"
            type="text"
            fullWidth
            required
            error={error}
            placeholder={error && "请输入昵称"}
            InputLabelProps={error && { shrink: true }}
            helperText={error && "请输入昵称"}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (name.trim() === "") {
                setName("");
                toggleError();
                return;
              }
              handleDialogClose();
              axios
                .post("user/guest", {
                  name,
                })
                .then(({ data }) => {
                  dispatch(loginAction(data));
                });
            }}
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <Loading open={loading} />
      <Grid
        container
        alignItems="stretch"
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Grid
          item
          xs={9}
          container
          direction="column"
          style={{ paddingRight: 4 }}
        >
          <Grid
            item
            container
            ref={messagesEndRef}
            spacing={1}
            alignContent={isMobile && inputFocus ? "flex-end" : "flex-start"}
            style={{ overflowY: "auto", height: "60vh" }}
          >
            <Grid item xs={12}>
              机器人请在开头加上一个空格，比如「 时间」、「 ip」、「 md5
              123456」、「 单复数 category」
            </Grid>
            {chat?.chatBoard.length > 0 &&
              chat.chatBoard.map((content, index) => {
                return content.id === localStorage.userId ? (
                  <Grid item xs={12} key={index} style={{ textAlign: "right" }}>
                    <span style={{ marginRight: 4 }}>{content.message}</span>
                    <Avatar
                      alt={content.name}
                      email={lab.userEmail}
                      size={24}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} key={index}>
                    <Avatar
                      alt={content.name}
                      email={_.find(chat.peoples, ["id", content.id])["email"]}
                      size={24}
                    />
                    <span style={{ marginLeft: 4 }}>{content.message}</span>
                  </Grid>
                );
              })}
          </Grid>
          <Grid item>
            <TextField
              label="发送信息"
              value={message}
              fullWidth
              variant="standard"
              onFocus={() => handleToggleInputFocus(true)}
              onBlur={() => handleToggleInputFocus(false)}
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
          container
          spacing={1}
          xs={3}
          ref={peoplesRef}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: "rgba(0, 0, 0, 0.1)",
            borderLeftStyle: "solid",
            paddingRight: 4,
          }}
          alignContent={isMobile && inputFocus ? "flex-end" : "flex-start"}
        >
          {chat.peoples.map((people) => {
            return (
              <Grid item xs={12} key={people.id}>
                <Avatar
                  alt={people.name}
                  email={people.email}
                  size={24}
                  marginLeft={4}
                />
                <span style={{ marginLeft: 4 }}>{people.name}</span>
                {typing === people.id && (
                  <Expire delay={2000}> 输入中...</Expire>
                )}
              </Grid>
            );
          })}
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
