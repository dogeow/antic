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
        style={{
          width: 288,
          height: 288,
          padding: 46,
          border: "5px dotted",
          backgroundImage: data ? `url(${data.url})` : "none",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ paddingTop: "25%", textAlign: "center" }}>
            拖放文件到这里
          </p>
        ) : (
          <p style={{ paddingTop: "25%", textAlign: "center" }}>
            拖放文件到这里，或点击选择文件
          </p>
        )}
      </Grid>
      <Grid item xs>
        <Typography variant="body2" component="h3">
          图片地址：{undefined === data ? "请先上传图片" : data.url}
        </Typography>
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
        <Alert onClose={handleClose} severity="success">
          上传成功
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default EmojiCreate;
