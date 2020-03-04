import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const HallOfFame = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('thing/love').then(resp => setData(resp.data.files))
  }, []);

  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      {
        data.map((item, index) => (
          <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
            <img id={index} src={item["src"]} alt={item["name"]} width="100%"/>
            <Typography variant="body2" component="h3">
              {item["name"]}
            </Typography>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default HallOfFame
