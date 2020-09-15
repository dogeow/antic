import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

const Moon = () => {
  const history = useHistory();

  const [moon, setMoon] = React.useState("");
  const [num1, setNum1] = React.useState();
  const [num2, setNum2] = React.useState();
  const [num3, setNum3] = React.useState();
  const [num4, setNum4] = React.useState();
  const [num5, setNum5] = React.useState();
  const [num6, setNum6] = React.useState();

  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [moonHistory, setMoonHistory] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.moon) {
      axios
        .post("history", {
          moon: localStorage.moon,
        })
        .then((resp) => {
          setMoonHistory(resp.data);
        });
    }
  }, []);

  const handleChange = (e) => {
    setMoon(e.target.value);
  };

  const handlePost = () => {
    axios
      .post("moon", {
        moon,
      })
      .then((resp) => {
        if (resp.status === 201) {
          localStorage.moon = resp.data.name;
          history.push("/moon");
        }
      });
  };

  const handleStart = () => {
    setStatus("");
    setNum1(undefined);
    setNum2(undefined);
    setNum3(undefined);
    setNum4(undefined);
    setNum5(undefined);
    setNum6(undefined);
    setLoading(true);
    axios
      .post("start", {
        moon: localStorage.moon,
      })
      .then((resp) => {
        if (typeof resp.data === "string") {
          setNum1(undefined);
          setNum2(undefined);
          setNum3(undefined);
          setNum4(undefined);
          setNum5(undefined);
          setNum6(undefined);
          setLoading(false);
          alert(resp.data);
        } else {
          setNum1(resp.data.dice[0]);
          setTimeout(() => {
            setNum2(resp.data.dice[1]);
          }, 500);
          setTimeout(() => {
            setNum3(resp.data.dice[2]);
          }, 1000);
          setTimeout(() => {
            setNum4(resp.data.dice[3]);
          }, 1500);
          setTimeout(() => {
            setNum5(resp.data.dice[4]);
          }, 2000);
          setTimeout(() => {
            setNum6(resp.data.dice[5]);
            setLoading(false);
          }, 2500);
          setTimeout(() => {
            setStatus(resp.data.rankName);
            setMoonHistory(resp.data.history);
          }, 4000);
        }
      });
  };

  return (
    <>
      {localStorage.moon ? (
        <div>
          <div>
            <img
              src={`/images/moon/${
                num1 ? `${num1}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num1}
            />
            <img
              src={`/images/moon/${
                num2 ? `${num2}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num2}
            />
            <img
              src={`/images/moon/${
                num3 ? `${num3}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num3}
            />
            <img
              src={`/images/moon/${
                num4 ? `${num4}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num4}
            />
            <img
              src={`/images/moon/${
                num5 ? `${num5}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num5}
            />
            <img
              src={`/images/moon/${
                num6 ? `${num6}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num6}
            />
          </div>
          <div>{status}</div>
          <div>
            <button onClick={handleStart}>摇</button>
          </div>
        </div>
      ) : (
        <Grid container spacing={2} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <h1>来吗？</h1>
          </Grid>
          <Grid item xs={12}>
            <img src="/images/moon/Roll_the_dice.jpg" width="75" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="联系方式"
              variant="outlined"
              onChange={handleChange}
              placeholder="姓名、微信号、手机"
              helperText="以便发奖"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handlePost}>
              确定
            </Button>
          </Grid>
        </Grid>
      )}
      {localStorage.moon && (
        <div>
          <h2>我的</h2>
          <ul>
            {moonHistory.map((item) => (
              <li key={item.id}>
                <img src={`/images/moon/${item.num1}.gif`} width="25" />
                <img src={`/images/moon/${item.num2}.gif`} width="25" />
                <img src={`/images/moon/${item.num3}.gif`} width="25" />
                <img src={`/images/moon/${item.num4}.gif`} width="25" />
                <img src={`/images/moon/${item.num5}.gif`} width="25" />
                <img src={`/images/moon/${item.num6}.gif`} width="25" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr
        style={{
          border: "none",
          borderBottom: "1px dashed #DaDaDa",
          height: "1px",
          margin: "20px 20px",
        }}
      />
      <div>
        <h2>统计信息</h2>
        <ul>
          <li>人数：</li>
          <li>人次：</li>
          <li>总金额：</li>
        </ul>
      </div>
    </>
  );
};

export default Moon;
