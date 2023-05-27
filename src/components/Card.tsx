import { ExpandMore as ExpandMoreIcon, Share as ShareIcon } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import * as React from "react";

import { CDN_URL } from "../config/services";

interface TextObject {
  title: string;
  subHeader: string;
  img: string;
  link: string;
  intro: string;
  feeling: string;
}

const RecipeReviewCard: React.FC<TextObject> = ({ title, subHeader, img, link, intro, feeling }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader title={title} subheader={subHeader} />
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "100%", // 16:9
          backgroundSize: "contain",
        }}
        image={`${CDN_URL}/like/${img}!/compress/true/fw/800`}
        title="Paella dish"
      />
      <CardContent sx={{ minHeight: "11em" }}>
        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: intro }} />
      </CardContent>
      <CardActions disableSpacing>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="share" size="large">
            <ShareIcon />
          </IconButton>
        </a>
        <IconButton
          sx={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: "auto",
            transition: "0.3s",
          }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="large"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{feeling}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeReviewCard;
