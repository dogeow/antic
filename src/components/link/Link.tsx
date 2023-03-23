import * as React from "react";
import { Link } from "react-router-dom";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

export default ({ to, children, ...props }: Props) => {
  if (!to) return <span {...props}>{children}</span>;

  if (/^https?:\/\//.test(to))
    return (
      <a href={to} {...props} rel="noreferrer" target="_blank">
        {children}
      </a>
    );

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};
