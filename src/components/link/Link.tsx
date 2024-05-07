import * as React from "react";
import { Link } from "react-router-dom";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

const ExternalLink: React.FC<Props> = ({ to, children, ...props }) => {
  if (!to) return <span {...props}>{children}</span>;

  if (/^https?:\/\//.test(to))
    return (
      <a href={to} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default ExternalLink;
