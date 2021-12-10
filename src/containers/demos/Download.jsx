import * as FileSaver from "file-saver";
import axios from "instance/axios";
import React from "react";

export default () => {
  React.useEffect(() => {
    axios.get("/xlsx", { responseType: "blob" }).then(({ data }) => {
      FileSaver.saveAs(data, "test.xlsx");
    });
  }, []);

  return <div />;
};
