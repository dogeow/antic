import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

import { CDN_URL } from "../../config/services";
import { getGravatarAddress } from "../../helpers";

interface AvatarProps {
  marginLeft?: number;
  size?: number;
  css?: SerializedStyles;
}

const Avatar = styled.img<AvatarProps>`
  vertical-align: middle;
  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: ${marginLeft}px;
    `};
  ${({ size }) =>
    size &&
    css`
      width: ${size}px;
    `};
`;

const Gravatar: React.FC<{ size: number; alt: string; email: string; marginLeft?: number }> = ({
  size,
  alt,
  email,
  marginLeft,
}) => {
  return (
    <Avatar
      alt={alt}
      src={email ? getGravatarAddress(email, size * 2) : `${CDN_URL}/Robot.svg`}
      size={size}
      marginLeft={marginLeft}
    />
  );
};

export default Gravatar;
