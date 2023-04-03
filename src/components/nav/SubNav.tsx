import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Menu from "./Menu";

interface MenuItem {
  title: string;
  url: string;
}

interface SubNavProps {
  data: MenuItem[];
}

const SubNav: React.FC<SubNavProps> = ({ data }) => (
  <Grid container spacing={2}>
    {Object.keys(data).map((category, index) => {
      const bookmarks = data[category];

      return (
        <Grid key={index} container spacing={0} style={{ marginBottom: 20 }}>
          <Grid style={{ marginBottom: 20 }}>
            <Typography variant="subtitle1" component="h2">
              {category}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {bookmarks.map((bookmark, index) => (
              <Menu url={bookmark.url} name={bookmark.title} key={index} />
            ))}
          </Grid>
        </Grid>
      );
    })}
  </Grid>
);

export default SubNav;
