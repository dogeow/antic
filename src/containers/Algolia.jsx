import algoliaSearch from "algoliasearch/lite";
import React from "react";
import { InstantSearch } from "react-instantsearch-dom";

import AlgoliaSearch from "../components/AlgoliaSearch";

const searchClient = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_APP_KEY
);

const Algolia = () => (
  <InstantSearch searchClient={searchClient} indexName="posts">
    <AlgoliaSearch />
  </InstantSearch>
);

export default Algolia;
