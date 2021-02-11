import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Moon = () => {
  const history = useHistory();

  const cdn = `${process.env.REACT_APP_CDN_URL}/moon/`;
  const [num, setNum] = React.useState([]);
  const [name, setName] = React.useState(localStorage.getItem("name"));
  const [status, setStatus] = React.useState("");
  const [money, setMoney] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [moonHistory, setMoonHistory] = React.useState([]);
  const [statistics, setStatistics] = React.useState({});
  const [inputErrors, setInputErrors] = useState(false);

  React.useEffect(() => {
    const query = name ? `?name=${name}` : "";
    axios.get(`moon${query}`).then((resp) => {
      setMoonHistory(resp.data.history);
      setStatistics(resp.data.statistics);
    });
  }, [name]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handlePost = () => {
    axios.post("moon", { name }).then((resp) => {
      if (resp.status === 201) {
        localStorage.name = resp.data.name;
        history.push("/moon");
      } else {
        setInputErrors(resp.data.errors);
      }
    });
  };

  const handleStart = () => {
    setStatus("");
    setMoney(undefined);
    setNum([]);
    setLoading(true);
    axios
      .post("start", {
        name: localStorage.name,
      })
      .then((resp) => {
        if (typeof resp.data === "string") {
          setNum([]);
          setLoading(false);
          alert(resp.data);
        } else {
          setNum([resp.data.dice[0]]);
          setTimeout(() => {
            setNum((state) => {
              return [...state, resp.data.dice[1]];
            });
          }, 500);
          setTimeout(() => {
            setNum((state) => {
              return [...state, resp.data.dice[2]];
            });
          }, 1000);
          setTimeout(() => {
            setNum((state) => {
              return [...state, resp.data.dice[3]];
            });
          }, 1500);
          setTimeout(() => {
            setNum((state) => {
              return [...state, resp.data.dice[4]];
            });
          }, 2000);
          setTimeout(() => {
            setNum((state) => {
              return [...state, resp.data.dice[5]];
            });
            setLoading(false);
          }, 2500);
          setTimeout(() => {
            setStatus(resp.data.rankName);
            setMoney(resp.data.money);
            setMoonHistory(resp.data.history);
            setStatistics(resp.data.statistics);
          }, 4000);
        }
      });
  };

  return (
    <>
      {localStorage.name ? (
        <div>
          <div>
            <img
              src={`${cdn}${
                num[0] ? `${num[0]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[0]}
            />
            <img
              src={`${cdn}${
                num[1] ? `${num[1]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[1]}
            />
            <img
              src={`${cdn}${
                num[2] ? `${num[2]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[2]}
            />
            <img
              src={`${cdn}${
                num[3] ? `${num[3]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[3]}
            />
            <img
              src={`${cdn}${
                num[4] ? `${num[4]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[4]}
            />
            <img
              src={`${cdn}${
                num[5] ? `${num[5]}.gif` : loading ? "none.gif" : "1.png"
              }`}
              width="50"
              alt={num[5]}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleStart}>
              摇
            </Button>
            <span style={{ marginLeft: 10 }}>{status}</span>
            <span style={{ marginLeft: 10 }}>{money && `(${money})`}</span>
          </div>
        </div>
      ) : (
        <Grid container spacing={2} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <h1>来吗？</h1>
          </Grid>
          <Grid item xs={12}>
            <img src="${cdn}Roll_the_dice.jpg" width="75" alt="roll" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="联系方式"
              variant="outlined"
              onChange={handleChange}
              helperText={
                inputErrors && inputErrors.name
                  ? inputErrors.name[0]
                  : "以便发奖"
              }
              error={inputErrors && inputErrors.name}
              placeholder={
                inputErrors && inputErrors.name
                  ? inputErrors.name
                  : "姓名、微信号、手机"
              }
              InputLabelProps={
                inputErrors && inputErrors.name ? { shrink: true } : {}
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handlePost}>
              确定
            </Button>
          </Grid>
        </Grid>
      )}
      {localStorage.name && (
        <div>
          <h2>我的</h2>
          <ol>
            {moonHistory.map((item) => (
              <li key={item.id}>
                <img
                  src={`${cdn}history/${item.num1}.png`}
                  width="25"
                  alt={item.num1}
                />
                <img
                  src={`${cdn}history/${item.num2}.png`}
                  width="25"
                  alt={item.num2}
                />
                <img
                  src={`${cdn}history/${item.num3}.png`}
                  width="25"
                  alt={item.num3}
                />
                <img
                  src={`${cdn}history/${item.num4}.png`}
                  width="25"
                  alt={item.num4}
                />
                <img
                  src={`${cdn}history/${item.num5}.png`}
                  width="25"
                  alt={item.num5}
                />
                <img
                  src={`${cdn}history/${item.num6}.png`}
                  width="25"
                  alt={item.num6}
                />
                <span style={{ marginLeft: 10 }}>{`(${item.money})`}</span>
                <span style={{ marginLeft: 10 }}>{item.name}</span>
              </li>
            ))}
          </ol>
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
          <li>人数：{statistics.user}</li>
          <li>人次：{statistics.count}</li>
          <li>总金额：{statistics.money}</li>
        </ul>
      </div>
    </>
  );
};

export default Moon;
