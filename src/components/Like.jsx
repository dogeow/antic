import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Card from "./Card";

const Like = () => {
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios.get("like").then(({ data }) => {
      setLike(data);
    });
  }, []);

  return (
    <Grid container spacing={2} justify="flex-start">
      {like.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card
            title={item.name}
            subHeader={item.sub_header}
            img={item.img}
            link={item.link}
            intro={item.intro}
            feeling={item.feeling}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Like;
