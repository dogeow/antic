import styled from "@emotion/styled";
import React from "react";

import graphQl from "../resources/graphQl";
import laravel from "../resources/laravel";
import materialUi from "../resources/materialUi";
import react from "../resources/react";

const Img = styled.img`
  width: 20px;
  vertical-align: middle;
`;

export default () => (
  <>
    Power By <Img src={react} alt="React" />
    {" + "}
    <Img src={laravel} alt="Laravel" />
    {" + "}
    <Img src={materialUi} alt="Material-UI" />
    {" + "}
    <Img src={graphQl} alt="GraphQL" />
  </>
);
