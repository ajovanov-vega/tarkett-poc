import React from "react";

const Filters = ({ filters, onCheckboxChange }) => {
  if (!filters) return null;

  const filtersItems = (filtersKey, filtersValue) => {
    return Object.entries(filtersValue.items).map(([valueKey, valueName]) => {
      return (
        <li className="search__filters-group-list-item" key={valueKey}>
          <label className="search__checkbox">
            <input
              type="checkbox"
              name={filtersKey}
              defaultValue={valueName.value}
              onChange={onCheckboxChange}
            />
            {valueName.name}
          </label>
        </li>
      );
    });
  };

  return (
    <div className="search__filters-groups">
      {Object.entries(filters).map(([filtersKey, filtersValue]) => {
        return (
          <div className="search__filters-group" key={filtersKey}>
            <h3 className="search__filters-group-title">
              {filtersValue.group}
            </h3>
            <ul className="search__filters-group-list">
              {filtersItems(filtersKey, filtersValue)}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
