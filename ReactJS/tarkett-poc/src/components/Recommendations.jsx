import React from "react";

const Recommendations = ({ list, userValue, searchLink }) => {
  if (list.length === 0 || !userValue) {
    return null;
  }
  const recommendationsList = () => {
    return list.map((searchData, index) => {
      const regex = new RegExp("(" + userValue + ")", "gi");
      const label = searchData.label;
      const parts = label.split(regex);
      const searchQuery = label.toLowerCase();
      const webLink = searchLink(searchQuery);

      return (
        <li key={index} className="search__recommendation-list-item">
          <a
            target="_blank"
            rel="noreferrer"
            href={webLink}
            className="search__recommendation-list-link"
          >
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i}>{part}</strong>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="search__recommendation">
      <h2 className="search__recommendation-title">Do you mean</h2>
      <ul className="search__recommendation-list">{recommendationsList()}</ul>
    </div>
  );
};

export default Recommendations;
