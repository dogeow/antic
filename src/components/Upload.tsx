import Grid from "@mui/material/Grid";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";

import axios from "../instance/axios";
import { snackMessageState } from "../states";

const transformRequest = [(data) => data];

const styles = {
  container: {
    width: "100%",
    border: "5px dotted",
  },
  textCenter: {
    textAlign: "center",
  },
  img: {
    maxWidth: "100%",
  },
};

const Upload = (props) => {
  const [data, setData] = useState();
  const [, setSnackMessage] = useRecoilState(snackMessageState);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new Blob([acceptedFiles[0]]);
      const formData = new FormData();
      formData.append("key", props.keyName);
      formData.append(props.keyName, file, acceptedFiles[0].name);
      try {
        const response = await axios.post("images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "image/*",
          },
          transformRequest,
          onUploadProgress(e) {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              window.console.log(`${percentage}%`); // 上传进度
            }
          },
        });
        setData(response.data);
        setSnackMessage("上传成功");
      } catch (error) {
        console.error(error);
        setSnackMessage("上传失败，请重试。");
      }
    },
    [props.keyName, setSnackMessage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid item xs={12} {...getRootProps()} style={styles.container}>
      <input {...getInputProps()} />
      <p style={styles.textCenter}>{!data && isDragActive ? "拖放文件到这里" : "拖放文件到这里，或点击选择文件"}</p>
      {data && <img src={data.url} alt="上传的图片" style={styles.img} />}
    </Grid>
  );
};

export default Upload;
