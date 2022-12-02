import { gql } from "@apollo/client";

const POST = gql`
  query ($page: Int, $categoryId: Int) {
    posts(category_id: $categoryId, first: 8, page: $page, orderBy: [{ column: UPDATED_AT, order: DESC }]) {
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
    tagsCount {
      id
      name
      count
    }
    categories {
      id
      name
      count
    }
  }
`;

const POST_LIST = gql`
  query ($page: Int, $categoryId: Int) {
    posts(category_id: $categoryId, first: 8, page: $page, orderBy: [{ column: UPDATED_AT, order: DESC }]) {
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
  query ($id: Int!, $page: Int) {
    posts(category_id: $id, first: 8, page: $page) {
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
  query ($name: String!, $page: Int) {
    tag(name: $name, first: 8, page: $page) {
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

const TAGS_WITH_COUNT = gql`
  query {
    tagsCount {
      id
      name
      count
    }
  }
`;

const POST_BY_ID = gql`
  query ($id: Int!) {
    post(id: $id) {
      id
      title
      content
      created_at
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
`;

const DELETE_POST_BY_ID = gql`
  mutation ($id: ID!) {
    deletePost(id: $id) {
      title
    }
  }
`;

const TAGS = gql`
  query {
    tags {
      id
      name
    }
  }
`;

export { POST, POST_LIST, CATEGORY, TAG, TAGS, TAGS_WITH_COUNT, CATEGORIES, POST_BY_ID, DELETE_POST_BY_ID };
