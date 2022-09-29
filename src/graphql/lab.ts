import { gql } from "@apollo/client";

const QUOTES = gql`
  query {
    quotes {
      content
    }
  }
`;

export { QUOTES };
