import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Md5 } from "ts-md5";

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

import { gravatarCdn } from "../config/services.js";

export default function (props) {
  return (
    <Avatar
      alt={props.alt}
      src={
        props.email
          ? `${gravatarCdn}/${Md5.hashStr(props.email)}.jpg?d=monsterid&s=${props.size * 2}`
          : `${import.meta.env.VITE_CDN_URL}/Robot.svg`
      }
      size={props.size}
      marginLeft={props.marginLeft}
    />
  );
}
