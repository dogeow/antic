import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useMemo } from "react";

import { CDN_URL } from "../../config/services";
import { getGravatarAddress } from "../../helpers";

interface AvatarProps {
  marginLeftValue?: number;
  size?: number;
  css?: SerializedStyles;
}

interface Gravatar {
  email?: string;
  marginLeftValue?: number;
  alt: string;
  size: number;
}

const Avatar = styled.img<AvatarProps>`
  vertical-align: middle;
  ${({ marginLeftValue }) =>
    marginLeftValue &&
    css`
      margin-left: ${marginLeftValue}px;
    `};
  ${({ size }) =>
    size &&
    css`
      width: ${size}px;
    `};
`;

const Gravatar: FC<Gravatar> = ({ email, size, alt, marginLeftValue }) => {
  const gravatarAddress = useMemo(
    () => (email ? getGravatarAddress(email, size * 2) : `${CDN_URL}/Robot.svg`),
    [email, size]
  );

  return <Avatar alt={alt} src={gravatarAddress} size={size} marginLeftValue={marginLeftValue} />;
};

export default Gravatar;
