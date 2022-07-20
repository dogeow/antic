import * as React from "react";
import { useNavigate } from "react-router-dom";

import ChipFlow from "../components/ChipFlow";

const Tags = () => {
  const navigate = useNavigate();

  const handleClick = (tags) => {
    navigate(`/posts?filter[tags.name]=${tags}`);
  };

  return <ChipFlow path="tags" onHandleClick={handleClick} />;
};

export default Tags;
