import Grid from "@mui/material/Grid";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";

import axios from "../instance/axios";
import { snackMessageState } from "../states";

const Upload = (props) => {
  const [data, setData] = useState();
  const [, setSnackMessage] = useRecoilState(snackMessageState);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = new Blob([acceptedFiles[0]]);
      const formData = new FormData();
      formData.append("key", props.keyName);
      formData.append(props.keyName, file, acceptedFiles[0].name);
      axios
        .post("images", formData, {
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
          setSnackMessage("上传成功");
        });
    },
    [props.keyName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
      <p style={{ textAlign: "center" }}>
        {!data && isDragActive ? "拖放文件到这里" : "拖放文件到这里，或点击选择文件"}
      </p>
      {data && <img src={data.url} alt="上传的图片" style={{ maxWidth: "100%" }} />}
    </Grid>
  );
};

export default Upload;
