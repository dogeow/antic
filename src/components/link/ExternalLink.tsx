import * as React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Link(props: Props) {
  return (
    <a href={props.href} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  );
}
