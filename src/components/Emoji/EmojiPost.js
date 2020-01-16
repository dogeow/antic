import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const cdn = 'https://cdn.gugelong.com/love/';

const EmojiPost = () => {
  const [data, setData] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    const file = new Blob([acceptedFiles[0]]);
    const formData = new FormData();
    formData.append('emoji', file, acceptedFiles[0]['name']);
    axios.post('/emoji', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': "image/*"
      },
      transformRequest: [function (data) {
        return data
      }],
      onUploadProgress: function (e) {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          console.log(percentage + '%');  // 上传进度
        }
      }
    }).then(function (resp) {
      setData(resp.data);
    })
  }, []);

  useEffect(() => {
    axios.get('emoji').then(function (resp) {
      setData(resp.data.files);
    })
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>拖放文件到这里</p> :
            <p>拖放文件到这里，或点击选择文件</p>
        }
      </div>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="flex-end">
        {
          data.map((item, index) => {
            return (
              <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                <img id={index} src={cdn + item["name"]} alt={item["name"]} width="100%"
                />
                <Typography variant="body2" component="h3">
                  {item["name"]}
                </Typography>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
};

export default EmojiPost;
