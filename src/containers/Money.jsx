import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SubIcon from "@material-ui/icons/Remove";
import React, { useEffect, useState } from "react";

const emptyCost = { money: "", note: "", isCost: true };

const Money = () => {
  const [bills, setBills] = useState([emptyCost]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(1000);
  }, []);

  const toggleIsCostState = (billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], isCost: !bills[billIndex].isCost };
        }
        return item;
      })
    );
  };

  const addNew = () => {
    setBills([...bills, emptyCost]);
  };

  const changeMoney = (e, billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], money: e.target.value };
        }
        return item;
      })
    );
  };

  const changeNote = (e, billIndex) => {
    setBills(
      bills.map((item, index) => {
        if (index === billIndex) {
          return { ...bills[billIndex], note: e.target.value };
        }
        return item;
      })
    );
  };

  const calcRemaining = () => {
    let money = remaining;
    bills.map((bill) => {
      if (bill.money !== "" && bill.money !== 0) {
        if (bill.isCost) {
          money = parseFloat(money) - parseFloat(bill.money);
        } else {
          money = parseFloat(money) + parseFloat(bill.money);
        }
      }
    });

    return money;
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>{remaining}</h2>
        {bills.map((bill, index) => (
          <Grid container spacing={1} key={index}>
            <Grid item xs={6}>
              <InputLabel htmlFor="input-with-icon-adornment">金额</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={bill.money}
                onChange={(e) => changeMoney(e, index)}
                startAdornment={
                  <InputAdornment
                    position="start"
                    onClick={() => toggleIsCostState(index)}
                  >
                    {bill.isCost ? <SubIcon /> : <AddIcon />}
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-basic"
                label="备注"
                onChange={(e) => changeNote(e, index)}
              />
            </Grid>
          </Grid>
        ))}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <AddCircleIcon onClick={addNew} />
        </div>
        <h2 style={{ textAlign: "right" }}>= {calcRemaining()}</h2>
      </div>
      <div>
        {remaining}
        {bills.map((bill) => {
          return bill.isCost
            ? " - " + bill.money + `（${bill.note}）`
            : " + " + bill.money + `（${bill.note}）`;
        })}
        = {calcRemaining()};
      </div>
    </>
  );
};

export default Money;
