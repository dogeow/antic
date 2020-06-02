import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const cdn = "https://cdn.gugelong.com/love/";

const EmojiCreate = () => {
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = new Blob([acceptedFiles[0]]);
    const formData = new FormData();
    formData.append("emoji", file, acceptedFiles[0]["name"]);
    axios
      .post("/emoji", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "image/*",
        },
        transformRequest: [
          function (data) {
            return data;
          },
        ],
        onUploadProgress: function (e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            console.log(percentage + "%"); // 上传进度
          }
        },
      })
      .then(function (resp) {
        setData(resp.data);
        setOpen(true);
      });
  }, []);

  useEffect(() => {
    axios.get("emoji").then(function (resp) {
      setData(resp.data.files);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      <Grid
        item
        xs={12}
        {...getRootProps()}
        style={{ padding: 46, border: "5px dotted" }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>拖放文件到这里</p>
        ) : (
          <p>拖放文件到这里，或点击选择文件</p>
        )}
      </Grid>
      {undefined === data ? (
        <Grid item>暂无上传的图片</Grid>
      ) : (
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <img src={data.url} alt="上传的图片" width="100%" />
          <Typography variant="body2" component="h3">
            图片地址：{data.url}
          </Typography>
        </Grid>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          上传成功
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default EmojiCreate;
