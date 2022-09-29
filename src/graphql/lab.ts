import { gql } from "@apollo/client";

const QUOTES = gql`
  query {
    quotes {
      content
    }
  }
`;

const ABOUT_ME = gql`
  query {
    aboutMe {
      id
      content
      category
    }
  }
`;

export { QUOTES };
