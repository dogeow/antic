import { gql } from "@apollo/client";

const POST_LIST = gql`
  query($page: Int, $categoryId: Int) {
    posts(
      category_id: $categoryId
      first: 8
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

const CATEGORY = gql`
  query($id: Int!, $page: Int) {
    posts(category_id: $id, first: 10, page: $page) {
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

const TAG = gql`
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

const CATEGORIES = gql`
  query {
    categories {
      id
      name
      count
    }
  }
`;

const TAGS = gql`
  query {
    TagsCount {
      id
      name
      count
    }
  }
`;

export { POST_LIST, CATEGORY, TAG, TAGS, CATEGORIES };
