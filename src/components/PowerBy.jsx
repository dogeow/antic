import styled from "@emotion/styled";
import React from "react";

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
    Power By <Img src={react} alt="React" />
    {" + "}
    <Img src={laravel} alt="Laravel" />
    {" + "}
    <Img src={materialUi} alt="Material-UI" />
    {" + "}
    <Img src={graphQl} alt="GraphQL" />
  </>
);
