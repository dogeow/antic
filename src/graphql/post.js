import { gql } from "@apollo/client";

export const POST_LIST = () => gql`
  query($page: Int) {
    posts(
      first: 10
      page: $page
      orderBy: [{ column: UPDATED_AT, order: DESC }]
    ) {
      data {
        id
        title
        updated_at
        public
        category {
          id
          name
        }
        tags {
          id
          name
        }
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
      }
    }
  }
`;

export const CATEGORY = () => gql`
  query($name: String!, $page: Int) {
    category(name: $name, first: 10, page: $page) {
      data {
        posts {
          id
          title
          updated_at
          public
          category {
            id
            name
          }
          tags {
            id
            name
          }
        }
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
      }
    }
  }
`;

export const TAG = () => gql`
  query($name: String!, $page: Int) {
    tag(name: $name, first: 10, page: $page) {
      data {
        posts {
          id
          title
          updated_at
          public
          category {
            id
            name
          }
          tags {
            id
            name
          }
        }
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
      }
    }
  }
`;
