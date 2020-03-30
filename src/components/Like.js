import React, {useEffect, useState} from 'react';
import Card from './Card';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

const Like = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('like').then(({data}) => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <Grid container spacing={2} justify={'flex-start'}>
      {
        data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card title={item.name} subHeader={item.sub_header}
                  img={item.img} link={item.link} intro={item.intro}
                  feeling={item.feeling} key={index}/>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default Like;
