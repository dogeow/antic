import Grid from "@mui/material/Grid";
import Upload from "components/Upload";
import React from "react";

const EmojiCreate = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
      <Upload keyName="emoji" />
    </Grid>
  );
};

export default EmojiCreate;
