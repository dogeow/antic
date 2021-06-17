import styled from "@emotion/styled";
import React from "react";

import ExternalLink from "../components/ExternalLink";
import graphQl from "../resources/svg/graphQl";
import laravel from "../resources/svg/laravel";
import materialUi from "../resources/svg/materialUi";
import react from "../resources/svg/react";

const Img = styled.img`
  width: 20px;
  vertical-align: middle;
`;

export default () => (
  <>
    Power By{" "}
    <ExternalLink href="https://reactjs.org">
      <Img src={react} alt="React" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://laravel.com">
      <Img src={laravel} alt="Laravel" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://material-ui.com">
      <Img src={materialUi} alt="Material-UI" />
    </ExternalLink>
    {" + "}
    <ExternalLink href="https://graphql.org">
      <Img src={graphQl} alt="GraphQL" />
    </ExternalLink>
  </>
);
