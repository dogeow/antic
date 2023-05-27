import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { getHost } from "../../helpers";

interface MenuProps {
  url: string;
  name: string;
}

const Menu: React.FC<MenuProps> = ({ url, name }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card sx={{ minHeight: 152 }}>
          <CardContent>
            <Typography variant="body1" component="h3" sx={{ wordWrap: "break-word" }}>
              {name}
            </Typography>
            <Typography color="textSecondary" sx={{ wordWrap: "break-word" }}>
              {getHost(url)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
};

export default Menu;
