import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useMemo } from "react";

import { CDN_URL } from "../../config/services";
import { getGravatarAddress } from "../../helpers";

interface AvatarProps {
  marginLeftValue?: number;
  size?: string;
  css?: SerializedStyles;
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
      width: ${size};
    `};
`;

const Gravatar: FC<{ size: string; alt: string; email: string; marginLeftValue?: number }> = ({
  size,
  alt,
  email,
  marginLeftValue,
}) => {
  const gravatarAddress = useMemo(
    () => (email ? getGravatarAddress(email, parseInt(size) * 2) : `${CDN_URL}/Robot.svg`),
    [email, size]
  );

  return <Avatar alt={alt} src={gravatarAddress} size={size} marginLeftValue={marginLeftValue} />;
};

export default Gravatar;
