import md5 from "md5";
import React from "react";
import styled, { css } from "styled-components";

const Avatar = styled.img`
  vertical-align: text-bottom;
  ${(props) =>
    props.size &&
    css`
      width: ${props.size}px;
    `};
`;

import { gravatarCdn } from "../config/services";

export default function (props) {
  return (
    <Avatar
      alt={props.alt}
      src={`${gravatarCdn}/${md5(props.email)}.jpg?d=monsterid&s=${
        props.size * 2
      }`}
      size={props.size}
    />
  );
}
