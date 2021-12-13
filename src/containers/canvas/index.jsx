import { getPointOnCanvas } from "helpers/canvas";
import useCanvas from "hooks/useCanvas";
import produce from "immer";
import axios from "instance/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.lab.token);

  const game = useCallback((e) => {
    const x = e.pageX;
    const y = e.pageY;
    const canvas = e.target;
    const loc = getPointOnCanvas(canvas, x, y);

    setUsers(
      produce((draft) => {
        const user = draft.find((user) => user.id === localStorage.userId);
        if (user) {
          user.loc = loc;
        } else {
          draft.push({
            id: localStorage.userId,
            name: localStorage.userName,
            loc,
          });
        }
      })
    );

    axios.post(
      "/game",
      { loc },
      {
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
      }
    );
  }, []);

  useEffect(() => {
    // 监听事件
    document.addEventListener("mousedown", game);

    return () => document.removeEventListener("mousedown", game);
  }, [game]);

  useEffect(() => {
    window.Echo.options.auth.headers.Authorization = token;

    window.Echo.private("game").listen(".game", (e) => {
      setUsers(
        produce((draft) => {
          const user = draft.find((user) => user.id === e.data.id);
          if (user) {
            user.loc = e.data.loc;
          } else {
            draft.push(e.data);
          }
        })
      );
    });

    return () => {
      window.Echo.private("game").stopListening(".game");
      window.Echo.leave("game");
    };
  }, [token]);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    for (const user of users) {
      ctx.font = "24px JetBrains Mono, monospace";
      ctx.fillText(user.name, user.loc.x, user.loc.y);
    }
    ctx.restore();
  };

  const canvasRef = useCanvas(draw);

  return <canvas id="canvas" ref={canvasRef} width="800px" height="400px" />;
};
