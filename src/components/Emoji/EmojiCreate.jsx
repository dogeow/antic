import Grid from "@material-ui/core/Grid";
import React from "react";

import Upload from "../../components/Upload";

const EmojiCreate = () => {
  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      <Upload keyName="emoji" />
    </Grid>
  );
};

export default EmojiCreate;
