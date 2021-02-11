import { gql, useQuery } from "@apollo/client";
import * as React from "react";

const USER_BY_ID = gql`
  query {
    user(id: 1) {
      id
      name
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(USER_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <>{data.user.name}</>;
};

export default Test;
