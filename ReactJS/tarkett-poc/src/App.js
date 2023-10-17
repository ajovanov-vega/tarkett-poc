import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

const exampleFilters = {
  thickness: {
    group: "Thickness",
    items: {
      3_5: {
        name: "3.5",
        value: "thickness3_5",
      },
      2_5: {
        name: "2.5",
        value: "thickness2_5",
      },
      0x6: {
        name: "0.6",
        value: "thickness0_6",
      },
    },
  },
  layingMethod: {
    group: "Laying Method",
    items: {
      click: {
        name: "Click",
        value: "layingMethod-click",
      },
      bonding: {
        name: "Bonding/Floating",
        value: "layingMethod-bonding",
      },
      gluing: {
        name: "Gluing down",
        value: "layingMethod-gluing",
      },
    },
  },
  hue: {
    group: "Hue",
    items: {
      dark: {
        name: "Dark",
        value: "hue-dark",
      },
      medium: {
        name: "Medium",
        value: "hue-medium",
      },
      light: {
        name: "Light",
        value: "hue-light",
      },
    },
  },
  surfaceTreatment: {
    group: "Surface Treatment",
    items: {
      naturaMattLacquer: {
        name: "Natura Matt Lacquer",
        value: "surfaceTreatment-natura-matt-lacquer",
      },
      hardwaxOil: {
        name: "Hardwax Oil",
        value: "surfaceTreatment-hardwax-oil",
      },
      extraMatt: {
        name: "Extra Matt",
        value: "surfaceTreatment-extra-matt",
      },
      varnish: {
        name: "Varnish",
        value: "surfaceTreatment-varnish",
      },
    },
  },
  pattern: {
    group: "Pattern",
    items: {
      bar1: {
        name: "1-bar",
        value: "pattern-bar1",
      },
      bar2: {
        name: "2-bar",
        value: "pattern-bar2",
      },
      bar3: {
        name: "3-bar",
        value: "pattern-bar3",
      },
      gridBoard: {
        name: "Grid Board",
        value: "pattern-grid-board",
      },
      herringboneParquet: {
        name: "Herringbone Parquet",
        value: "pattern-herringbone-parquet",
      },
      largeSquares: {
        name: "Large Squares",
        value: "pattern-large-squares",
      },
      smallSquares: {
        name: "Small Squares",
        value: "pattern-small-squares",
      },
    },
  },
  colorFamily: {
    group: "Color Family",
    items: {
      white: {
        name: "White",
        value: "colorFamily-white",
      },
      beige: {
        name: "Beige",
        value: "colorFamily-beige",
      },
      grey: {
        name: "Grey",
        value: "colorFamily-grey",
      },
      black: {
        name: "Black",
        value: "colorFamily-black",
      },
    },
  },
  kindOfWood: {
    group: "Kind of Wood",
    items: {
      oak: {
        name: "Oak",
        value: "kindOfWood-oak",
      },
      box: {
        name: "Box",
        value: "kindOfWood-box",
      },
      walnut: {
        name: "Walnut",
        value: "kindOfWood-walnut",
      },
      book: {
        name: "Book",
        value: "kindOfWood-book",
      },
      birch: {
        name: "Birch",
        value: "kindOfWood-birch",
      },
    },
  },
  width: {
    group: "Width (cm)",
    items: {
      19: {
        name: "19",
        value: "width-19",
      },
      19_4: {
        name: "19.4",
        value: "width-19_4",
      },
      19_2: {
        name: "19.2",
        value: "width-19_2",
      },
      16_2: {
        name: "16.2",
        value: "width-16_2",
      },
      13_4: {
        name: "13.4",
        value: "width-13_4",
      },
      12: {
        name: "12",
        value: "width-12",
      },
      11: {
        name: "11",
        value: "width-11",
      },
    },
  },
  collection: {
    group: "Collection",
    items: {
      shade: {
        name: "Shade",
        value: "collection-shade",
      },
      pure: {
        name: "Pure",
        value: "collection-pure",
      },
      prestige: {
        name: "Prestige",
        value: "collection-prestige",
      },
      grace: {
        name: "Grace",
        value: "collection-grace",
      },
      viva: {
        name: "Viva",
        value: "collection-viva",
      },
      noble: {
        name: "Noble",
        value: "collection-noble",
      },
      heritage: {
        name: "Heritage",
        value: "collection-heritage",
      },
      segno: {
        name: "Segno",
        value: "collection-segno",
      },
    },
  },
};

const exampleData = [
  {
    label: "Natural Oak",
    filters: [exampleFilters.kindOfWood.items.oak.value],
    image:
      "https://home.tarkett.com/media/img/M/TH_RR_ICONIK_Classical_Oak_Natural_001.jpg",
    imageSmall:
      "https://home.tarkett.com/media/img/S/TH_RR_ICONIK_Classical_Oak_Natural_001.jpg",
  },
  {
    label: "Oak Light",
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.hue.items.light.value,
    ],
    image:
      "https://home.tarkett.com/media/img/M/TH_RR_ICONIK_French_Oak_Light_001.jpg",
    imageSmall:
      "https://home.tarkett.com/media/img/S/TH_RR_ICONIK_French_Oak_Light_001.jpg",
  },
  {
    label: "Oak Medium",
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.hue.items.medium.value,
    ],
    image:
      "https://media.tarkett-image.com/medium/TH_RR_ICONIK_Fumed_Oak_Medium_Brown_001.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_RR_ICONIK_Fumed_Oak_Medium_Brown_001.jpg",
  },
  {
    label: "Oak Light Grey",
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.hue.items.light.value,
      exampleFilters.pattern.items.gridBoard.value,
    ],
    image:
      "https://home.tarkett.com/media/img/M/TH_RR_ICONIK_Legacy_Oak_Light_grey_001.jpg",
    imageSmall:
      "https://home.tarkett.com/media/img/S/TH_RR_ICONIK_Legacy_Oak_Light_grey_001.jpg",
  },
  {
    label: "Walnut tres",
    filters: [exampleFilters.kindOfWood.items.walnut.value],
    image: "https://home.tarkett.com/media/img/M/TH_8577007_8577008_001.jpg",
    imageSmall:
      "https://home.tarkett.com/media/img/S/TH_8577007_8577008_001.jpg",
  },
  {
    label: "Light Walnut",
    filters: [
      exampleFilters.kindOfWood.items.walnut.value,
      exampleFilters.hue.items.light.value,
    ],
    image: "https://media.tarkett-image.com/medium/TH_8582002_001_800_800.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_8582002_001_800_800.jpg",
  },
  {
    label: "Dark Walnut tres",
    filters: [
      exampleFilters.kindOfWood.items.walnut.value,
      exampleFilters.hue.items.dark.value,
    ],
    image: "https://media.tarkett-image.com/medium/TH_8577007_8577008_001.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_8577007_8577008_001.jpg",
  },
  {
    label: "Tundra Oak Spring",
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.layingMethod.items.click.value,
    ],
    image: "https://media.tarkett-image.com/medium/TH_7806006_001_800_800.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_7806006_001_800_800.jpg",
  },
  {
    label: "Tendenza Cool Grey",
    filters: [
      exampleFilters.hue.items.light.value,
      exampleFilters.pattern.items.largeSquares.value,
    ],
    image:
      "https://media.tarkett-image.com/medium/TH_RR_ICONIK_Tendenza_Cool_Grey_001.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_RR_ICONIK_Tendenza_Cool_Grey_001.jpg",
  },
  {
    label: "Admiral Dark Brown",
    filters: [
      exampleFilters.hue.items.dark.value,
      exampleFilters.pattern.items.smallSquares.value,
    ],
    image:
      "https://media.tarkett-image.com/medium/TH_LA_SKIRTING_Classic_Walnut_Red_L179.jpg",
    imageSmall:
      "https://media.tarkett-image.com/small/TH_LA_SKIRTING_Classic_Walnut_Red_L179.jpg",
  },
];

const exampleCommonSearch = [
  {
    label: "Rustic Velvet",
  },
  {
    label: "Watercolor",
  },
  {
    label: "OK",
  },
  {
    label: "Target",
  },
  {
    label: "Optimum",
  },
];

function App() {
  const inputRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showInputLabel, setShowInputLabel] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const [showCommon, setShowCommon] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearchResultsTop, setShowSearchResultsTop] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showFilterClear, setShowFilterClear] = useState(false);
  const [showFilterNoText, setShowFilterNoText] = useState(false);
  const [filterNo, setFilterNo] = useState(0);
  const [showSearchListBox, setShowSearchListBox] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [searchAllHref, setSearchAllHref] = useState("blank");
  const [searchList, setSearchList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [userValue, setUserValue] = useState("");
  const [data] = useState(exampleData);

  const searchLink = (searchTerm) => {
    return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`;
  };

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const populateRecommendations = () => {
    let recommendationsHTML = "";

    if (searchList.length === 0 && !userValue) {
      recommendationsHTML = "";
      return;
    }

    recommendationsHTML = searchList
      .map((data) => {
        const regex = new RegExp("(" + userValue + ")", "gi");
        const searchTerm = data.label.replace(regex, "<strong>$1</strong>");
        const searchQuery = data.label.toLowerCase();
        const webLink = searchLink(searchQuery);

        if (showFilters === false) {
          setShowRecommendations(true);
        }

        return `<li class="search__recommendation-list-item">
        <a target="_blank" href="${webLink}" class="search__recommendation-list-link js-recommendation-item" href="blank">
          ${searchTerm}
        </a>
      </li>`;
      })
      .join("");

    return recommendationsHTML;
  };

  const showResults = () => {
    if (exampleData.length === 0) return;

    const hasFilters = selectedFilters.length > 0;
    const hasUserValue = userValue.trim() !== "";

    if (hasUserValue || hasFilters) {
      // Filter results based on selected filters and user input
      const filteredResults = exampleData.filter((data) => {
        return (
          (!hasFilters && !hasUserValue) || // Show all results if no filters are selected
          (selectedFilters.every((filter) => data.filters.includes(filter)) &&
            (!hasUserValue ||
              data.label.toLowerCase().includes(userValue.toLowerCase())))
        );
      });

      const isResultsAvailable = filteredResults.length > 0;

      // Set state to control visibility
      setShowSearchListBox(!isResultsAvailable);
      setShowEmpty(!isResultsAvailable);
      setShowCommon(!isResultsAvailable);
      setShowSearchResults(false);
      setShowSearchResultsTop(!isResultsAvailable);

      if (!isResultsAvailable) {
        return "";
      }

      const searchResultsHTML = filteredResults.map((data, index) => {
        const searchQuery = data.label.toLowerCase();
        const webLink = searchLink(searchQuery);

        return (
          <li className="search__results-list-item js-results-item" key={index}>
            <a
              className="search__results-list-link"
              href={webLink}
              target="_blank"
            >
              <picture className="search__results-list-picture">
                <source media="(min-width:1024px)" srcSet={data.image} />
                <img
                  alt={`${data.label}-${index + 1}`}
                  className="search__results-list-image"
                  src={data.imageSmall}
                />
              </picture>
              <span className="search__results-list-info">
                <span className="search__results-list-item-title">
                  {data.label}
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

      return searchResultsHTML;
    }

    setShowCommon(false);
    setShowSearchResults(true);
    setShowSearchResultsTop(false);
    return "";
  };

  const formActionLink = (text) => {
    if (!text) {
      setSearchAllHref("");
      return setFormAction("");
    }
    const link = searchLink(text);
    setSearchAllHref(link);
    return setFormAction(link);
  };

  const select = (element) => {
    const selectData = element.textContent.toLowerCase();
    formActionLink(selectData);
    setShowInputLabel(false);
    setShowSearch(false);
    setShowResetButton(false);
  };

  // Event listeners and event handlers
  const handleInputChange = (e) => {
    setUserValue(e.target.value);
    formActionLink(userValue);
    setShowInputLabel(userValue);
    setShowResetButton(userValue);

    searchList(
      userValue
        ? exampleData.filter((data) =>
            data.label.toLowerCase().includes(userValue.toLowerCase())
          )
        : []
    );

    showRecommendations();
    showResults();

    if (userValue.length > 0) {
      setShowSearch(true);
      setShowCommon(false);
    } else {
      setShowCommon(!showFilters);
      setShowEmpty(false);
    }
  };

  const handleSearchItemClick = (e) => {
    if (e.target.classList.contains("js-recommendation-item")) {
      select(e.target);
    }
  };

  const handleSearchReset = (e) => {
    e.preventDefault();
    setSearchList([]);
    setSelectedFilters([]);
    setUserValue("");
    formActionLink();
    inputRef.current.value = "";
    setShowInputLabel(false);
    setFormAction("");
    setShowCommon(true);
    setShowSearch(false);
    setShowResetButton(false);
    showRecommendations();
    showResults();
    toggleShowSearch();
  };

  const handleFilterClear = () => {
    setSelectedFilters([]);
    setShowFilterClear(false);
    setShowFilterNoText(false);
    // filtersCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    showResults();
  };

  // const handleCheckboxChange = (checkbox) => {
  //   selectedFilters = Array.from(filtersCheckboxes)
  //       .filter((checkbox) => checkbox.checked)
  //       .map((checkbox) => checkbox.value);

  //   showResults();

  //   if (selectedFilters.length === 0) {
  //     filterClear.hidden = true;
  //     return (filterNoText.hidden = true);
  //   }

  //   filterNo.textContent = selectedFilters.length;
  //   filterClear.hidden = false;
  //   filterNoText.hidden = false;

  //   return;
  // };

  return (
    <main className="main">
      <div className="container">
        <a
          target="_blank"
          className="logo"
          href="https://home.tarkett.com/en_EU"
        >
          <img
            width={182}
            height={40}
            src="./assets/svg/logo-blue.svg"
            alt="Tarkett"
          />
        </a>
        <form
          className={`search js-search-form ${showSearch && "search--active"}`}
          target="_blank"
          method="POST"
          action={formAction}
        >
          <div className="search__components">
            <div className="search__component">
              <div className="search__input-holder">
                <div className="search__input-prefix">
                  <button type="submit" className="search__submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      viewBox="0 0 26.5 26.5"
                    >
                      <path
                        fill="currentColor"
                        d="M12.6 25.3C5.7 25.3 0 19.6 0 12.6S5.7 0 12.6 0c7 0 12.6 5.7 12.6 12.6s-5.6 12.7-12.6 12.7zm0-23.8c-6.1 0-11.1 5-11.1 11.1s5 11.1 11.1 11.1 11.1-5 11.1-11.1-5-11.1-11.1-11.1zM25.8 26.5c-.2 0-.4-.1-.5-.2l-2.5-2.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.5 2.5c.3.3.3.8 0 1.1-.2.2-.4.2-.6.2z"
                      />
                    </svg>
                  </button>
                </div>
                <input
                  ref={inputRef}
                  id="search"
                  className="search__input js-search-input"
                  type="text"
                  placeholder="Search Products"
                  onInput={(e) => handleInputChange(e)}
                  onClick={toggleShowSearch}
                />
                {showResetButton && (
                  <div className="search__input-affix">
                    <button className="search__reset" type="reset" hidden="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fill="currentColor"
                          d="m7 8.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7L5.6 7 .7 2.1a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275L7 5.6 11.9.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L8.4 7l4.9 4.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L7 8.4Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                {showInputLabel && (
                  <label className="search__input-label" htmlFor="search">
                    Press Enter to Search
                  </label>
                )}
              </div>
              <div className="search__results-container">
                <div className="search__results-wrapper">
                  {/* Filters */}
                  <div
                    className={`search__filters js-filters ${
                      showFilters && "search__filters--active"
                    }`}
                  >
                    <div className="search__filters-top">
                      <button
                        type="button"
                        className="search__filters-toggle"
                        onClick={toggleShowFilters}
                      >
                        <span className="search__filters-toggle-text">
                          Filters
                        </span>
                        <span className="search__filters-toggle-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            viewBox="0 0 25 15.5"
                          >
                            <path
                              fill="currentColor"
                              d="m2.9 0 9.6 9.6L22.1 0 25 3 12.5 15.5 0 3l2.9-3z"
                            />
                          </svg>
                        </span>
                        {showFilterNoText && (
                          <span className="search__filters-toggle-number">
                            <strong className="js-filter-no">{filterNo}</strong>{" "}
                            filters applied
                          </span>
                        )}
                      </button>
                      {showFilterClear && (
                        <button
                          className="search__filters-clear"
                          type="button"
                          onClick={handleFilterClear}
                        >
                          <span className="search__filters-clear-text">
                            Clear all Filters
                          </span>
                          <span className="search__filters-clear-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 14 14"
                            >
                              <path
                                fill="currentColor"
                                d="m7 8.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7L5.6 7 .7 2.1a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275L7 5.6 11.9.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L8.4 7l4.9 4.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L7 8.4Z"
                              />
                            </svg>
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="search__filters-container">
                      <div className="search__filters-groups">
                        {Object.entries(exampleFilters).map(([key, value]) => {
                          return (
                            <div className="search__filters-group">
                              <h3 className="search__filters-group-title">
                                {value.group}
                              </h3>
                              <ul className="search__filters-group-list">
                                {Object.entries(value.items).map(
                                  ([valueKey, valueName]) => {
                                    return (
                                      <li className="search__filters-group-list-item">
                                        <label className="search__checkbox">
                                          <input
                                            type="checkbox"
                                            name={key}
                                            defaultValue={valueName.value}
                                          />
                                          {valueName.name}
                                        </label>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* Common Search */}
                  <div className="search__common js-common">
                    <h2 className="search__common-title">Common Searches</h2>
                    <ul className="search__common-list">
                      {exampleCommonSearch.map((common) => {
                        const commonLinkTrim = common.label.trim();
                        return (
                          <li className="search__common-list-item">
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="search__common-list-link"
                              href={`https://home.tarkett.com/en_EU/search/products?search[body]=${commonLinkTrim}&userQuery=${commonLinkTrim}`}
                            >
                              {common.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* Recommendation search / Do you mean */}
                  <div
                    className="search__recommendation js-recommendation"
                    hidden=""
                  >
                    <h2 className="search__recommendation-title">
                      Do you mean
                    </h2>
                    <ul className="search__recommendation-list js-recommendation-list">
                      {populateRecommendations()}
                    </ul>
                  </div>
                  {/* Search results */}
                  {showSearchResults && (
                    <div className="search__results js-search-results">
                      {showSearchResultsTop && (
                        <div className="search__results-top">
                          <h2 className="search__results-title">
                            Top Product Results
                          </h2>
                          <a
                            className="search__results-all js-results-all"
                            href={searchAllHref}
                          >
                            <span className="search__results-all-text">
                              Show All Products
                            </span>
                            <span className="search__results-all-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                viewBox="0 0 25 11.2"
                              >
                                <path
                                  fill="currentColor"
                                  d="M24.8 6.1c.3-.3.3-.8 0-1.1L20 .2c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l4.3 4.3-4.3 4.3c-.3.3-.3.8 0 1.1s.8.3 1.1 0l4.8-4.9zM0 6.3h24.2V4.8H0v1.5z"
                                />
                              </svg>
                            </span>
                          </a>
                        </div>
                      )}
                      {showEmpty && (
                        <div className="search__results-empty js-search-empty">
                          <span className="search__results-empty-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlSpace="preserve"
                              viewBox="0 0 26.5 26.5"
                            >
                              <path
                                fill="currentColor"
                                d="M12.6 25.3C5.7 25.3 0 19.6 0 12.6S5.7 0 12.6 0c7 0 12.6 5.7 12.6 12.6s-5.6 12.7-12.6 12.7zm0-23.8c-6.1 0-11.1 5-11.1 11.1s5 11.1 11.1 11.1 11.1-5 11.1-11.1-5-11.1-11.1-11.1zM25.8 26.5c-.2 0-.4-.1-.5-.2l-2.5-2.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.5 2.5c.3.3.3.8 0 1.1-.2.2-.4.2-.6.2z"
                              />
                            </svg>
                          </span>
                          <p className="search__results-empty-text">
                            There are no results for searched criteria.
                            <br />
                            Adjust the filters and search term.
                          </p>
                        </div>
                      )}
                      {showSearchListBox && (
                        <ul className="search__results-list js-search-list">
                          {showResults}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
