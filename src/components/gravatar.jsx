import { css } from "@emotion/react";
import styled from "@emotion/styled";
import md5 from "md5";
import React from "react";

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

import { gravatarCdn } from "../config/services";

export default function (props) {
  return (
    <Avatar
      alt={props.alt}
      src={
        props.email
          ? `${gravatarCdn}/${md5(props.email)}.jpg?d=monsterid&s=${
              props.size * 2
            }`
          : `${process.env.REACT_APP_CDN_URL}/Robot.svg`
      }
      size={props.size}
      marginLeft={props.marginLeft}
    />
  );
}
