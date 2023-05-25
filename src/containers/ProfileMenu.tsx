import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AxiosResponse } from "axios";
import produce from "immer";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { getGravatarAddress, getItem } from "../helpers";
import { logout } from "../helpers/auth";
import axios from "../instance/axios";
import { logoutRequest } from "../requests/user";
import { isExpiredState, isSnackOpenState, snackMessageState, usersState, userState } from "../states";

export default () => {
  const [, setSnackMessage] = useRecoilState(snackMessageState);
  const [, setIsSnackOpen] = useRecoilState(isSnackOpenState);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const profileOpen = Boolean(mobileMoreAnchorEl);
  const [users, setUsers] = useRecoilState(usersState);
  const [user, setUser] = useRecoilState(userState);
  const [, setIsExpired] = useRecoilState(isExpiredState);

  const handleProfileMenu = useCallback(
    (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    },
    [setMobileMoreAnchorEl]
  );

  const handleCloseProfile = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="个人中心" aria-label="个人中心">
        <IconButton
          aria-label="account of current user"
          aria-controls="profile"
          aria-haspopup="true"
          color="inherit"
          onClick={handleProfileMenu}
          size="large"
        >
          <Avatar alt={user.name} src={getGravatarAddress(user.email, 80)} />
        </IconButton>
      </Tooltip>
      <Menu
        id="profile"
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={profileOpen}
        onClose={handleCloseProfile}
      >
        <Link to={`/user/${user.id}`} onClick={handleCloseProfile}>
          <div style={{ textAlign: "center", fontSize: "1rem" }}>
            <Avatar
              alt={user.name}
              src={getGravatarAddress(user.email, 160)}
              style={{ width: 80, height: 80, margin: "20px auto" }}
            />
            {user.name}
          </div>
        </Link>
        {users.map((user, index) => {
          return (
            user.email !== user.email && (
              <MenuItem
                onClick={() => {
                  setUser(user);
                  handleCloseProfile();
                }}
                key={index}
              >
                <Avatar alt={user.name} src={getGravatarAddress(user.email, 160)} />
                <span
                  style={{
                    margin: "0 10px 0 10px",
                    fontSize: "0.8rem",
                  }}
                >
                  {user.name}
                  <br />
                  {user.email}
                </span>
              </MenuItem>
            )
          );
        })}
        <Divider />
        <Link to="/login" onClick={() => handleCloseProfile()}>
          <MenuItem>
            <PersonAddIcon style={{ width: 40 }} />
            <span style={{ margin: "0 10px 0 10px" }}>添加其他账号</span>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            setMobileMoreAnchorEl(null);
            const requests: Promise<AxiosResponse>[] = [];
            if (getItem("users")) {
              (JSON.parse(localStorage.users) as User[]).map((user) => {
                axios.defaults.headers.common.Authorization = user.accessToken;
                requests.push(logoutRequest(user.accessToken));
                Promise.all(requests).then(function ([acct, perms]) {
                  localStorage.removeItem("users");
                  setUsers([]);
                });
              });
            }
            if (getItem("user.accessToken")) {
              logoutRequest(user.accessToken).then(() => {
                setUser(
                  produce((draft: User) => {
                    draft.accessToken = "";
                  })
                );
                logout();
              });
              setIsExpired(true);
            }
            setSnackMessage("退出成功");
            setIsSnackOpen(true);
          }}
        >
          <LogoutIcon style={{ width: 40 }} />
          <span style={{ margin: "0 10px 0 10px" }}>{localStorage.users ? "注销所有账号" : "注销"}</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
