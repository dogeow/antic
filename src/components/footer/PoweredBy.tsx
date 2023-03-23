import styled from "@emotion/styled";
import * as React from "react";

import graphQl from "../../resources/svg/graphQl";
import laravel from "../../resources/svg/laravel";
import materialUi from "../../resources/svg/materialUi";
import react from "../../resources/svg/react";
import ExternalLink from "../link/ExternalLink";

const Img = styled.img`
  width: 20px;
  vertical-align: middle;
`;

export default () => (
  <>
    Powered By 🫴{" "}
    <ExternalLink href="https://reactjs.org">
      <Img src={react} alt="React" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://laravel.com">
      <Img src={laravel} alt="Laravel" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://mui.com">
      <Img src={materialUi} alt="Material-UI" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://graphql.org">
      <Img src={graphQl} alt="GraphQL" />
    </ExternalLink>
  </>
);
