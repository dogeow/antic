import * as React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function Link(props: Props) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
