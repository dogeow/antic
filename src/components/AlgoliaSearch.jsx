import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import { connectAutoComplete, Highlight } from "react-instantsearch-dom";

const AC = (props) => {
  const [value, setValue] = useState(props.currentRefinement);

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.refine(value);
  };

  const onSuggestionsClearRequested = () => {
    props.refine();
  };

  const getSuggestionValue = (hit) => {
    return hit.name;
  };

  const renderSuggestion = (hit) => {
    return <Highlight attribute="title" hit={hit} tagName="mark" />;
  };

  const { hits, onSuggestionSelected } = props;

  const inputProps = {
    placeholder: "Search for a product...",
    onChange,
    value,
  };

  return (
    <AutoSuggest
      suggestions={hits}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default connectAutoComplete(AC);
