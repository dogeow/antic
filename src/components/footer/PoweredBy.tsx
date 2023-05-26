import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import * as React from "react";

import graphQl from "../../resources/svg/graphQl";
import laravel from "../../resources/svg/laravel";
import materialUi from "../../resources/svg/materialUi";
import react from "../../resources/svg/react";

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = (props) => (
  <Box component="img" sx={{ width: 20, verticalAlign: "middle" }} {...props} />
);

const App: React.FC = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <span>Powered By 🫴</span>
    <Link href="https://reactjs.org">
      <Image src={react} alt="React" />
    </Link>
    <span>+</span>
    <Link href="https://laravel.com">
      <Image src={laravel} alt="Laravel" />
    </Link>
    <span>+</span>
    <Link href="https://mui.com">
      <Image src={materialUi} alt="Material-UI" />
    </Link>
    <span>+</span>
    <Link href="https://graphql.org">
      <Image src={graphQl} alt="GraphQL" />
    </Link>
  </Box>
);

export default App;
