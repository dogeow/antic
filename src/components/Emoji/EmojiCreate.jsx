import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import { snackMessage } from "../../actions";
import axios from "../../instance/axios";

const EmojiCreate = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
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
          dispatch(snackMessage("上传成功"));
        });
    },
    [dispatch]
  );

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
    </Grid>
  );
};

export default EmojiCreate;
