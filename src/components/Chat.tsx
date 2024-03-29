import SendIcon from "@mui/icons-material/Send";
import { Button, Dialog, DialogActions, DialogContent, Grid, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import produce from "immer";
import { find, uniqBy } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState } from "recoil";

import { replaceItemAtIndex } from "../helpers";
import { getItem } from "../helpers";
import { logged } from "../helpers/auth";
import axios from "../instance/axios";
import { chatBoardState, isExpiredState, peopleState, snackState, usersState, userState } from "../states";
import Expire from "./display/Expire";
import Avatar from "./display/Gravatar";
import Loading from "./display/Loading";

const useStyle = makeStyles(() => ({
  userList: {
    borderLeftWidth: 2,
    borderLeftColor: "rgba(0, 0, 0, 0.1)",
    borderLeftStyle: "solid",
    paddingRight: 4,
  },
}));

let timer = null;

const intro = "机器人请在开头加上一个「/」，比如「/时间」、「/ip」、「/md5 123456」、「/单复数 category」";

export default function Chat() {
  const classes = useStyle();

  const [loading, setLoading] = useState(window?.Echo?.socketId() === null);
  const [typing, setTyping] = useState(undefined);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [people, setPeople] = useRecoilState(peopleState);
  const [chatBoard, setChatBoard] = useRecoilState(chatBoardState);
  const [user, setUser] = useRecoilState(userState);
  const [, setUsers] = useRecoilState(usersState);
  const [, setIsExpired] = useRecoilState(isExpiredState);
  const [, setSnack] = useRecoilState(snackState);
  const [open, setOpen] = useState(user.accessToken === "");
  const [error, setError] = useState({});
  const [inputFocus, setInputFocus] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleError = (error) => {
    setError(error);
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

  const offline = (user) =>
    setPeople(
      produce((draft) => {
        const person: ChatPeople = draft.find((person) => person.id === user.id);
        if (person) {
          person.active = false;
        }
      })
    );

  useEffect(() => {
    if (user.accessToken === "") {
      offline(user);
      setOpen(true);
      return;
    }

    window.Echo.join("chat")
      .here((herePeople: ChatPeople[]) => {
        setLoading(false);
        const newPeople: ChatPeople[] = uniqBy([...people, ...herePeople], "id");
        setPeople(newPeople);
        if (find(newPeople, ["id", parseInt(user.id)])) {
          setSnack({
            message: "您已加入房间",
          });
        }
      })
      .joining((user: ChatPeople) => {
        const index = people.findIndex((person) => person.id === user.id);
        if (index) {
          const newPeople = replaceItemAtIndex(people, index, {
            ...user,
            active: true,
          });
          setPeople(newPeople);
        } else {
          const newPeople = uniqBy([user, ...people], "id");
          if (people !== newPeople) {
            setPeople(newPeople);
          }
        }
        setSnack({
          message: `${user.name} 加入了房间`,
        });
      })
      .leaving((user: ChatPeople) => {
        offline(user);
        setSnack({
          message: `${user.name} 退出了房间`,
        });
      });
  }, [user.accessToken, people]);

  useEffect(() => {
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
    };
  }, [user.accessToken]);

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
        id: getItem("user.id"),
        name: getItem("user.name"),
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

  const handleChange = (e) => {
    clearTimeout(timer);
    setMessage(e.target.value);
    timer = setTimeout(triggerChange, 500);
  };

  const triggerChange = () => {
    window.Echo.private("chat").whisper("typing", {
      id: parseInt(getItem("user.id")),
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
            error={!!Object.keys(error).length}
            placeholder={Object.keys(error).length ? "请输入昵称" : ""}
            InputLabelProps={Object.keys(error).length ? { shrink: true } : {}}
            helperText={Object.keys(error).length !== 0 && "请输入昵称"}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setName("");
              if (name.trim() === "") {
                toggleError({ error: "请输入昵称" });
                return;
              }
              axios.get("sanctum/csrf-cookie").then(() => {
                axios
                  .post("/user/guest", { name })
                  .then(({ data }) => {
                    logged(data);
                    const userData = {
                      accessToken: "Bearer " + data.accessToken,
                      id: data.id,
                      name: data.name,
                      email: data.email,
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
        <Grid item xs={9} container direction="column" style={{ paddingRight: 4 }}>
          <Grid
            item
            container
            ref={messagesEndRef}
            spacing={1}
            alignContent={isMobile && inputFocus ? "flex-end" : "flex-start"}
            style={{ overflowY: "auto", height: "60vh" }}
          >
            <Grid item xs={12}>
              {intro}
            </Grid>
            {chatBoard.length > 0 &&
              chatBoard.map((content: Content, index) => {
                return content.id === getItem("user.id") ? (
                  <Grid item xs={12} key={index} style={{ textAlign: "right" }}>
                    <span style={{ marginRight: 4 }}>{content.message}</span>
                    <Avatar alt={content.name} email={user.email} size={24} />
                  </Grid>
                ) : (
                  <Grid item xs={12} key={index}>
                    <Avatar email={find(people, ["id", content.id])["email"]} size={24} alt={content.name} />
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
          className={classes.userList}
          alignContent={isMobile && inputFocus ? "flex-end" : "flex-start"}
        >
          {people.map((person: ChatPeople) => (
            <Grid item xs={12} container key={person.id}>
              <Grid item xs={12}>
                <Avatar alt={person.name} email={person.email} size={24} marginLeftValue={4} />
                {typing === person.id && <Expire delay={2000}> 输入中...</Expire>}
              </Grid>
              <Grid item>
                <span style={{ marginLeft: 4 }}>
                  {person.name}
                  {!person.active && "（离线）"}
                </span>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
