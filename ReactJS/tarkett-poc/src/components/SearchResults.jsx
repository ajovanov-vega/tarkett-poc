import React, { useEffect } from "react";

const SearchResults = ({
  data,
  selectedFilters,
  userValue,
  searchLink,
  onUpdateResults,
}) => {
  const hasFilters = selectedFilters.length > 0;
  const hasUserValue = userValue.trim() !== "";

  const filterResults = () => {
    if (hasFilters || hasUserValue) {
      return data.filter((filteredData) => {
        return (
          (!hasFilters && !hasUserValue) ||
          (selectedFilters.every((filter) =>
            filteredData.filters.includes(filter)
          ) &&
            (!hasUserValue ||
              filteredData.label
                .toLowerCase()
                .includes(userValue.toLowerCase())))
        );
      });
    }
    return [];
  };

  const results = filterResults();
  const areResultsAvailable = results.length > 0;

  useEffect(() => {
    onUpdateResults(areResultsAvailable);
  }, [onUpdateResults, areResultsAvailable]);

  if (!areResultsAvailable) {
    return null;
  }

  const renderSearchResults = () => {
    return results.map((resultsData, index) => {
      const searchQuery = resultsData.label.toLowerCase();
      const webLink = searchLink(searchQuery); // Assuming searchLink is defined elsewhere

      return (
        <li className="search__results-list-item" key={index}>
          <a className="search__results-list-link" href={webLink}>
            <picture className="search__results-list-picture">
              <source media="(min-width:1024px)" srcSet={resultsData.image} />
              <img
                alt={`${resultsData.label}-${index + 1}`}
                className="search__results-list-image"
                src={resultsData.imageSmall}
              />
            </picture>
            <span className="search__results-list-info">
              <span className="search__results-list-item-title">
                {resultsData.label}
              </span>
              <span className="search__results-list-square-meter">
                SEK 529 /M²
              </span>
              <span className="search__results-list-square-package">
                SEK 1,334.00 /PACKAGE
              </span>
            </span>
          </a>
        </li>
      );
    });
  };

  return <ul className="search__results-list">{renderSearchResults()}</ul>;
};

export default SearchResults;
