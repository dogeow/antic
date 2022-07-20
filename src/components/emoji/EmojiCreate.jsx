import Grid from "@mui/material/Grid";
import React from "react";

import Upload from "../components/Upload";

const EmojiCreate = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
      <Upload keyName="emoji" />
    </Grid>
  );
};

export default EmojiCreate;
