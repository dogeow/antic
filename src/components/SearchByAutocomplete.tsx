import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import StarIcon from "@mui/icons-material/Star";
import algoliasearch from "algoliasearch/lite";
import * as React from "react";

import { CDN_URL } from "../config/services";
import { ClearIcon } from "./ClearIcon";
import Link from "./link/Link";
import { SearchIcon } from "./SearchIcon";

const searchClient = algoliasearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_APP_KEY);

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
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "posts",
                      query,
                      params: {
                        hitsPerPage: 10,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                        attributesToSnippet: ["title:10", "content:20"],
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
            {
              sourceId: "bookmarks",
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "bookmarks",
                      query,
                      params: {
                        hitsPerPage: 5,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                        attributesToSnippet: ["title:20", "url:10"],
                        snippetEllipsisText: "…",
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
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
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <div style={{ display: "flex", padding: 4 }}>
        <form ref={formRef} className="aa-Form" {...autocomplete.getFormProps({ inputElement: inputRef.current })}>
          <div className="aa-InputWrapperPrefix">
            <label
              className="aa-Label"
              {...autocomplete.getLabelProps({})}
              style={{ alignItems: "center", display: "flex", padding: "0 8px" }}
            >
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
            marginLeft: 4,
          }}
          onClick={props.closeSearch}
        >
          取消
        </button>
      </div>
      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={["aa-Panel", "aa-Panel--desktop", autocompleteState.status === "stalled" && "aa-Panel--stalled"]
            .filter(Boolean)
            .join(" ")}
          {...autocomplete.getPanelProps({})}
          style={{ position: "unset", overflow: "scroll", height: "85vh" }}
        >
          <div className="aa-PanelLayout" style={{ height: "unset", maxHeight: "unset" }}>
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  <h3 style={{ color: "blue", padding: "10px 5px" }}>{source.sourceId}</h3>
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()} onClick={props.closeSearch}>
                      {items.map((item) => {
                        return (
                          <div style={{ margin: 8 }} key={item.objectID}>
                            <Link to={item.__autocomplete_indexName === "bookmarks" ? item.url : `/posts/${item.id}`}>
                              <li
                                style={{
                                  display: "flex",
                                  borderRadius: 4,
                                  padding: 8,
                                  border: "1px solid #ccc",
                                }}
                                {...autocomplete.getItemProps({ item, source })}
                              >
                                <div className="aa-ItemIcon">
                                  {item.__autocomplete_indexName === "bookmarks" ? (
                                    <StarIcon style={{ color: "orange" }} />
                                  ) : (
                                    <img
                                      src={`${CDN_URL}/logo/${item.category}.svg`}
                                      alt={item.name}
                                      width="40"
                                      height="40"
                                    />
                                  )}
                                </div>
                                <div
                                  style={{
                                    padding: "0 8px",
                                    cursor: "pointer",
                                    lineHeight: "1.25em",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    className="aa-ItemContentTitle"
                                    dangerouslySetInnerHTML={{
                                      __html: item._snippetResult.title.value,
                                    }}
                                  />
                                  <div
                                    className="aa-ItemContentDescription"
                                    dangerouslySetInnerHTML={{
                                      __html: item._snippetResult?.content
                                        ? item._snippetResult.content.value
                                        : item._snippetResult.url.value,
                                    }}
                                  />
                                </div>
                                <button
                                  className="aa-ItemActionButton aa-TouchOnly aa-ActiveOnly"
                                  type="button"
                                  title="Select"
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"></path>
                                  </svg>
                                </button>
                              </li>
                            </Link>
                          </div>
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
