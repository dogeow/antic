import * as FileSaver from "file-saver";
import * as React from "react";

import axios from "../../instance/axios";

export default () => {
  React.useEffect(() => {
    axios.get("/xlsx", { responseType: "blob" }).then(({ data }) => {
      FileSaver.saveAs(data, "test.xlsx");
    });
  }, []);

  return <div />;
};
