import React from "react";
import algoliaSearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_APP_KEY
);

const Algolia = () => (
  <InstantSearch searchClient={searchClient} indexName="posts">
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default Algolia;
