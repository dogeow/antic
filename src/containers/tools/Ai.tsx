import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useState } from "react";

import ClipboardButton from "../../components/ClipboardButton";
import axios from "../../instance/axios";

const useStyles = makeStyles((theme) => ({
  response: {
    width: "100%",
    textAlign: "left",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    minHeight: "50vh",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Ai = () => {
  const classes = useStyles();
  const [content, setContent] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [open, setOpen] = useState(false);

  const getClipboardButton = (value) => {
    return (
      <div>
        点击图标复制
        <ClipboardButton text={value} handleClick={handleClick} />
      </div>
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleInputValueChange = (event) => {
    setContent(event.target.value);
    console.log(event.target.value);
  };

  const handleSendButtonClick = () => {
    axios
      .post("/ai", { content })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={1} maxWidth={"sm"} minWidth={"xs"} alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={3}
          label="问题"
          variant="outlined"
          value={content}
          fullWidth
          placeholder={"请输入问题"}
          onChange={handleInputValueChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSendButtonClick} fullWidth>
          发送
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.response} variant="body1" style={{ padding: 14 }}>
          {response}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {getClipboardButton(response)}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          复制成功
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Ai;
