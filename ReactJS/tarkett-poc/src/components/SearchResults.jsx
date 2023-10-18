import React from "react";

const SearchResults = ({
  data,
  selectedFilters,
  userValue,
  searchLink,
  setAreResultsAvailable,
}) => {
  if (data.length === 0) return null;

  const hasFilters = selectedFilters.length > 0;
  const hasUserValue = userValue.trim() !== "";

  if (hasUserValue || hasFilters) {
    // Filter results based on selected filters and user input
    const results = data.filter((filteredData) => {
      return (
        (!hasFilters && !hasUserValue) ||
        (selectedFilters.every((filter) =>
          filteredData.filters.includes(filter)
        ) &&
          (!hasUserValue ||
            filteredData.label.toLowerCase().includes(userValue.toLowerCase())))
      );
    });

    const areResultsAvailable = results.length > 0;
    setAreResultsAvailable(areResultsAvailable);

    if (!areResultsAvailable) {
      return null;
    }

    const searchResultsHTML = results.map((resultsData, index) => {
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

    return <ul className="search__results-list">{searchResultsHTML}</ul>;
  }

  setAreResultsAvailable(false);
  return null;
};

export default SearchResults;
