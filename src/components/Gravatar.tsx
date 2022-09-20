import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

import { CDN_URL } from "../config/services";

const Avatar = styled.img`
  vertical-align: middle;
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft}px;
    `};
  ${(props) =>
    props.size &&
    css`
      width: ${props.size}px;
    `};
`;

import { getGravatarAddress } from "../helpers";

const Gravatar = (props: { size: number; marginLeft: number; alt: string; email: string }) => {
  return (
    <Avatar
      alt={props.alt}
      src={props.email ? getGravatarAddress(props.email, props.size * 2) : `${CDN_URL}/Robot.svg`}
      size={props.size}
      marginLeft={props.marginLeft}
    />
  );
};

export default Gravatar;
