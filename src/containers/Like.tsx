import { gql, useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";

const LIKES = gql`
  query {
    likes {
      id
      name
      sub_header
      img
      link
      intro
      feeling
    }
  }
`;

interface Like {
  id: number;
  name: string;
  sub_header: string;
  img: string;
  link: string;
  intro: string;
  feeling: string;
}

const Like = () => {
  const [like, setLike] = useState([]);

  const { data } = useQuery(LIKES);

  useEffect(() => {
    if (data) {
      setLike(data.likes);
    }
  }, [data]);

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      {like.map((item: Like) => (
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
