import Grid from "@mui/material/Grid";
import * as React from "react";

import Upload from "../Upload";

const EmojiCreate = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
      <Upload keyName="emoji" />
    </Grid>
  );
};

export default EmojiCreate;
