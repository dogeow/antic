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
import Echo from "laravel-echo";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState } from "recoil";

import Avatar from "../components/Gravatar";
import Loading from "../components/Loading";
import { logged } from "../helpers";
import axios from "../instance/axios";
import {
  chatBoardState,
  isExpiredState,
  peopleState,
  usersState,
  userState,
} from "../states";
import Expire from "./Expire";

let timer = null;

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default function Chat() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(window?.Echo?.socketId() === null);
  const [typing, setTyping] = useState(undefined);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [people, setPeople] = useRecoilState(peopleState);
  const [chatBoard, setChatBoard] = useRecoilState(chatBoardState);
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [isExpired, setIsExpired] = useRecoilState(isExpiredState);

  const [error, setError] = useState({});
  const [inputFocus, setInputFocus] = useState(false);

  const messagesEndRef = useRef(null);
  const peopleRef = useRef(null);

  const [open, setOpen] = useState(user.token === "");

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
    let typingTime;

    window.Echo.private("chat").listenForWhisper("typing", (e) => {
      setTyping(undefined);
      setTyping(e.id);
    });

    window.Echo.private("chat").listen(".chat", (e) => {
      setChatBoard((chatBoard) => [...chatBoard, e.data]);
    });

    return () => {
      window.Echo.private("chat").stopListeningForWhisper("typing");
      window.Echo.private("chat").stopListening(".chat");
      window.Echo.leave("chat");
      if (typingTime) {
        clearTimeout(typingTime);
      }
    };
  }, [user.token]);

  useEffect(() => {
    if (user.token === null) {
      setOpen(true);
      return;
    }

    window.Echo.join("chat")
      .here((herePeople) => {
        setLoading(false);
        const newPeople = _.uniqBy([...people, ...herePeople], "id");
        setPeople(newPeople);
        if (_.find(newPeople, ["id", parseInt(user.userId)])) {
          setAlertMessage("您已加入房间");
          setAlertOpen(true);
        }
      })
      .joining((user) => {
        const index = people.findIndex((person) => person.id === user.id);
        if (index) {
          const newPeople = replaceItemAtIndex(people, index, {
            ...user,
            active: true,
          });
          setPeople(newPeople);
        } else {
          const newPeople = _.uniqBy([user, ...people], "id");
          if (people !== newPeople) {
            setPeople(newPeople);
          }
        }
        setAlertMessage(`${user.name} 加入了房间`);
        setAlertOpen(true);
      })
      .leaving((user) => {
        const index = people.findIndex((person) => person === user);
        const newPeople = replaceItemAtIndex(people, index, {
          ...user,
          active: false,
        });
        setPeople(newPeople);
        setAlertMessage(`${user.name} 退出了房间`);
        setAlertOpen(true);
      });
  }, [user.token, people]);

  useEffect(() => {
    scrollToBottom();
  }, [chatBoard]);

  const handlePost = () => {
    if (message === "") {
      return;
    }
    setChatBoard((chatBoard) => [
      ...chatBoard,
      {
        id: localStorage.userId,
        name: localStorage.userName,
        message,
      },
    ]);

    axios.post(
      "/chat",
      { message },
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
            error={Object.keys(error).length !== 0}
            placeholder={Object.keys(error).length !== 0 ? "请输入昵称" : ""}
            InputLabelProps={
              Object.keys(error).length !== 0 ? { shrink: true } : {}
            }
            helperText={Object.keys(error).length !== 0 && "请输入昵称"}
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
              axios.get("sanctum/csrf-cookie").then((response) => {
                axios
                  .post("/user/guest", { name })
                  .then(({ data }) => {
                    logged(data);
                    const userData = {
                      token: "Bearer " + data.access_token,
                      userId: data.id,
                      userName: data.name,
                      userEmail: data.email,
                    };
                    setUser(userData);
                    setUsers((oldUsers) => [...oldUsers, userData]);
                    setIsExpired(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
              handleDialogClose();
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
            {chatBoard.length > 0 &&
              chatBoard.map((content, index) => {
                return content.id === localStorage.userId ? (
                  <Grid item xs={12} key={index} style={{ textAlign: "right" }}>
                    <span style={{ marginRight: 4 }}>{content.message}</span>
                    <Avatar
                      alt={content.name}
                      email={user.userEmail}
                      size={24}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} key={index}>
                    <Avatar
                      alt={content.name}
                      email={_.find(people, ["id", content.id])["email"]}
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
          ref={peopleRef}
          style={{
            borderLeftWidth: 2,
            borderLeftColor: "rgba(0, 0, 0, 0.1)",
            borderLeftStyle: "solid",
            paddingRight: 4,
          }}
          alignContent={isMobile && inputFocus ? "flex-end" : "flex-start"}
        >
          {people.map((person) => {
            return (
              <Grid item xs={12} container key={person.id}>
                <Grid item xs={12}>
                  <Avatar
                    alt={person.name}
                    email={person.email}
                    size={24}
                    marginLeft={4}
                  />
                  {typing === person.id && (
                    <Expire delay={2000}> 输入中...</Expire>
                  )}
                </Grid>
                <Grid item>
                  <span style={{ marginLeft: 4 }}>
                    {person.name}
                    {person.active === false && "（离线）"}
                  </span>
                </Grid>
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
