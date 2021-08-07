import ChipFlow from "components/ChipFlow";
import * as React from "react";
import { useHistory } from "react-router-dom";

const Tags = () => {
  const history = useHistory();

  const handleClick = (tags) => {
    history.push(`/posts?filter[tags.name]=${tags}`);
  };

  return <ChipFlow path="tags" onHandleClick={handleClick} />;
};

export default Tags;
