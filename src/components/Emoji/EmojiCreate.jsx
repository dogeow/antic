import MuiAlert from "@material-ui/core/Alert";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    formData.append("emoji", file, acceptedFiles[0].name);
    axios
      .post("/emoji", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "image/*",
        },
        transformRequest: [(data) => data],
        onUploadProgress(e) {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            window.console.log(`${percentage}%`); // 上传进度
          }
        },
      })
      .then(({ data }) => {
        setData(data);
        setOpen(true);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      <Grid item xs>
        <Typography variant="body2" component="h3">
          图片地址：{undefined === data ? "请先上传图片" : data.url}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        {...getRootProps()}
        style={{
          width: "100%",
          border: "5px dotted",
        }}
      >
        <input {...getInputProps()} />
        {!data && isDragActive ? (
          <p style={{ textAlign: "center" }}>拖放文件到这里</p>
        ) : (
          <p style={{ textAlign: "center" }}>拖放文件到这里，或点击选择文件</p>
        )}
        {data && (
          <img src={data.url} alt="上传的图片" style={{ maxWidth: "100%" }} />
        )}
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
