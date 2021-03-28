import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaHits } from "@algolia/autocomplete-preset-algolia";
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { Link } from "react-router-dom";

import { ClearIcon } from "./ClearIcon";
import { SearchIcon } from "./SearchIcon";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_APP_KEY
);

export default function Autocomplete(props) {
  const [autocompleteState, setAutocompleteState] = React.useState({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  });
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: "posts",
              getItems({ query }) {
                return getAlgoliaHits({
                  searchClient,
                  queries: [
                    {
                      indexName: "posts",
                      query,
                      params: {
                        hitsPerPage: 5,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                        attributesToSnippet: ["title:10", "content:25"],
                        snippetEllipsisText: "…",
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `/posts/${item.id}`;
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = React.useRef(null);
  const formRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const { getEnvironmentProps } = autocomplete;

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div
      className="aa-Autocomplete"
      {...autocomplete.getRootProps({})}
      style={{ padding: 10 }}
    >
      <div style={{ display: "flex" }}>
        <form
          ref={formRef}
          className="aa-Form"
          {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        >
          <div className="aa-InputWrapperPrefix">
            <label className="aa-Label" {...autocomplete.getLabelProps({})}>
              <SearchIcon />
            </label>
          </div>
          <div className="aa-InputWrapper">
            <input
              className="aa-Input"
              ref={inputRef}
              {...autocomplete.getInputProps({
                inputElement: inputRef.current,
              })}
            />
          </div>
          <div className="aa-InputWrapperSuffix">
            <button className="aa-ClearButton" type="reset">
              <ClearIcon />
            </button>
          </div>
        </form>
        <button
          style={{
            flexShrink: 0,
            padding: 10,
            fontSize: "1rem",
            border: 0,
            color: "#5468ff",
            backgroundColor: "none",
          }}
          onClick={props.closeSearch}
        >
          取消
        </button>
      </div>
      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            "aa-Panel",
            "aa-Panel--desktop",
            autocompleteState.status === "stalled" && "aa-Panel--stalled",
          ]
            .filter(Boolean)
            .join(" ")}
          {...autocomplete.getPanelProps({})}
          style={{ position: "unset" }}
        >
          <div
            className="aa-PanelLayout"
            style={{ minHeight: "100%", maxHeight: "unset" }}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul
                      className="aa-List"
                      {...autocomplete.getListProps()}
                      onClick={props.closeSearch}
                    >
                      {items.map((item) => {
                        return (
                          <Link to={`/posts/${item.id}`} key={item.objectID}>
                            <li
                              className="aa-Item"
                              {...autocomplete.getItemProps({ item, source })}
                            >
                              <div className="aa-ItemIcon">
                                <img
                                  src={`${process.env.REACT_APP_CDN_URL}/logo/${item.category}.svg`}
                                  alt={item.name}
                                  width="40"
                                  height="40"
                                />
                              </div>
                              <div className="aa-ItemContent">
                                <div
                                  className="aa-ItemContentTitle"
                                  dangerouslySetInnerHTML={{
                                    __html: item._snippetResult.title.value,
                                  }}
                                />
                                <div
                                  className="aa-ItemContentDescription"
                                  dangerouslySetInnerHTML={{
                                    __html: item._snippetResult.content.value,
                                  }}
                                />
                              </div>
                              <button
                                className="aa-ItemActionButton aa-TouchOnly aa-ActiveOnly"
                                type="button"
                                title="Select"
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  width="20"
                                  height="20"
                                >
                                  <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"></path>
                                </svg>
                              </button>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
