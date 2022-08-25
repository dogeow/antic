import axios from "instance/axios";
import React, { useState } from "react";
import swal from "sweetalert2";

import config from "../../config/index.json";

function SignInSimple() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("user/login", {
        email,
        password,
      })
      .then(({ data }) => {
        const accessToken = data.access_token;
        if (accessToken) {
          swal.fire("提示️", "登录成功", "success");
          localStorage.token = `Bearer ${accessToken}`;
        }
      });
  };

  const handleCredentialsTest = () => {
    setEmail(config.testUser.email);
    setPassword(config.testUser.password);
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSignIn(e)}>
          <label>
            邮箱：
            <input
              name="email"
              type="text"
              value={email}
              placeholder="请输入邮箱"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            密码：
            <input
              name="password"
              type="password"
              value={password}
              placeholder="请输入密码"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input type="submit" value="登录" />
        </form>
      </div>
      <div>
        <ul>
          <li>昵称：{config.testUser.email}</li>
          <li>密码：{config.testUser.password}</li>
        </ul>
        <button onClick={handleCredentialsTest}>一键填入测试用户凭证</button>
      </div>
    </>
  );
}

export default SignInSimple;
