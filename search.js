document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector(".js-search-form");
  const searchAll = search.querySelector(".js-results-all");
  const searchEmpty = search.querySelector(".js-search-empty");
  const searchListBox = search.querySelector(".js-search-list");
  const searchResetBtn = search.querySelector(".js-reset");
  const searchResults = search.querySelector(".js-search-results");
  const searchResultsTop = search.querySelector(".js-search-results-top");
  const common = search.querySelector(".js-common");
  const filters = search.querySelector(".js-filters");
  const filterClear = filters.querySelector(".js-filter-clear");
  const filterNo = filters.querySelector(".js-filter-no");
  const filterNoText = filters.querySelector(".js-filter-no-text");
  const filterToggle = search.querySelector(".js-filter-toggle");
  const filtersListBox = search.querySelector(".js-filters-list");
  const filtersCheckboxes = filtersListBox.querySelectorAll(
    "input[type=checkbox]"
  );
  const inputBox = search.querySelector(".js-search-input");
  const inputLabel = search.querySelector(".js-search-input-label");
  const recommendation = search.querySelector(".js-recommendation");
  const recommendationList = recommendation.querySelector(
    ".js-recommendation-list"
  );
  const submitBtn = search.querySelector(".js-submit");

  // Example data
  const exampleData = [
    {
      label: "Natural Oak",
      filters: ["kind-of-wood-oak"],
    },
    {
      label: "Oak Light",
      filters: ["kind-of-wood-oak", "hue-light"],
    },
    {
      label: "Oak medium",
      filters: ["kind-of-wood-oak", "hue-medium"],
    },
    {
      label: "Oak light gray",
      filters: ["kind-of-wood-oak", "hue-light", "pattern-gray"],
    },
    {
      label: "Walnut tres",
      filters: ["kind-of-wood-walnut"],
    },
    {
      label: "Light Walnut",
      filters: ["kind-of-wood-walnut", "hue-light"],
    },
    {
      label: "Dark Walnut tres",
      filters: ["kind-of-wood-walnut", "hue-dark"],
    },
    {
      label: "Wood Flooring",
      filters: [],
    },
    {
      label: "Laminate Flooring",
      filters: [],
    },
    {
      label: "Caring for Laminated Flooring",
      filters: [],
    },
    {
      label: "Vinyl Flooring",
      filters: [],
    },
    {
      label: "Caring for Vinyl Flooring",
      filters: [],
    },
  ];

  // Initial variables
  let searchList = [];
  let selectedFilters = [];
  let userValue = "";

  // Search link to Tarkett search function
  const searchLink = (searchTerm) => {
    return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`;
  };

  // Filters button toggle function
  const toggleShowFilters = () => {
    if (filters.classList.contains("search__filters--active")) {
      return filters.classList.remove("search__filters--active");
    }
    return filters.classList.add("search__filters--active");
  };

  // Search dropdown toggle function
  const toggleShowSearch = () => {
    if (inputBox.value.length !== 0) return;
    if (search.classList.contains("search--active")) {
      return search.classList.remove("search--active");
    }
    return search.classList.add("search--active");
  };

  // Function to show recommendations
  const showRecommendations = () => {
    recommendation.hidden = true;

    if (searchList.length === 0 && !userValue) {
      recommendationList.innerHTML = "";
      return;
    }

    const recommendationsHTML = searchList
      .map((data) => {
        const regex = new RegExp("(" + userValue + ")", "gi");
        const searchTerm = data.label.replace(regex, "<strong>$1</strong>");
        const searchQuery = data.label.toLowerCase();
        const webLink = searchLink(searchQuery);

        if (!filters.classList.contains("search__filters--active")) {
          recommendation.hidden = false;
        }

        return `<li class="search__recommendation-list-item">
        <a target="_blank" href="${webLink}" class="search__recommendation-list-link js-recommendation-item" href="blank">
          ${searchTerm}
        </a>
      </li>`;
      })
      .join("");

    recommendationList.innerHTML = recommendationsHTML;
  };

  // Function to show search results
  const showResults = () => {
    if (!exampleData.length) return;

    if (!!userValue || !!selectedFilters.length) {
      // Filter results based on selected filters and user input
      const filteredResults = exampleData.filter((data) => {
        return (
          !selectedFilters.length || // Show all results if no filters are selected
          (selectedFilters.every((filter) => data.filters.includes(filter)) &&
            (!userValue ||
              data.label.toLowerCase().includes(userValue.toLowerCase())))
        );
      });

      const isResultsAvailable = !!filteredResults.length;
      const isFiltersWithoutResults =
        !isResultsAvailable && !!selectedFilters.length;

      searchListBox.hidden = !isResultsAvailable;
      searchEmpty.hidden = isResultsAvailable || !isFiltersWithoutResults;
      common.hidden = isResultsAvailable;
      searchResults.hidden = false;
      searchResultsTop.hidden = !isResultsAvailable;

      if (!isResultsAvailable) return;

      const searchResultsHTML = filteredResults
        .map((data) => {
          const searchQuery = data.label.toLowerCase();
          const webLink = searchLink(searchQuery);

          return `<li class="search__results-list-item js-results-item">
            <a class="search__results-list-link" href="${webLink}" target="_blank">
              <picture class="search__results-list-picture">
                <source media="(min-width:1024px)" srcset="./assets/images/example-image-big.jpg" />
                <img class="search__results-list-image" src="./assets/images/example-image-small.jpg" alt="${userValue}" />
              </picture>
              <span class="search__results-list-info">
                <span class="search__results-list-item-title">${data.label}</span>
                <span class="search__results-list-square-meter">SEK 529 /M²</span>
                <span class="search__results-list-square-package">SEK 1,334.00 /PACKAGE</span>
              </span>
            </a>
          </li>`;
        })
        .join("");

      return (searchListBox.innerHTML = searchResultsHTML);
    }

    searchListBox.innerHTML = "";
    common.hidden = false;
    searchResults.hidden = true;
    searchResultsTop.hidden = false;

    return;
  };

  const formActionLink = (text) => {
    if (!text) {
      searchAll.href = "";
      return (search.action = "");
    }
    const link = searchLink(text);
    searchAll.href = link;
    return (search.action = searchLink(link));
  };

  // Function to select a suggestion
  const select = (element) => {
    const selectData = element.textContent.toLowerCase();
    formActionLink(selectData);
    inputBox.value = selectData;
    inputLabel.hidden = true;
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
  };

  // Event listeners

  // Search function for input field based on keypress
  inputBox.addEventListener("keyup", (e) => {
    userValue = e.target.value;
    formActionLink(userValue);
    inputLabel.hidden = !userValue;
    searchResetBtn.hidden = !userValue;

    searchList = userValue
      ? exampleData.filter((data) =>
          data.label.toLowerCase().includes(userValue.toLowerCase())
        )
      : [];

    showRecommendations();
    showResults();

    if (!!userValue) {
      search.classList.add("search--active");
      common.hidden = true;
    } else {
      common.hidden = filters.classList.contains("search__filters--active");
      searchEmpty.hidden = true;
    }
  });

  inputBox.addEventListener("click", toggleShowSearch);

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-recommendation-item")) {
      select(e.target);
    }
  });

  searchResetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchList = [];
    selectedFilters = [];
    userValue = "";
    formActionLink();
    inputBox.value = "";
    inputLabel.hidden = true;
    search.action = "";
    common.hidden = false;
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
    showRecommendations();
    showResults();
    submitBtn.setAttribute("href", "blank");
    toggleShowSearch();
  });

  filterToggle.addEventListener("click", toggleShowFilters);

  filterClear.addEventListener("click", () => {
    selectedFilters = [];
    filterClear.hidden = true;
    filterNoText.hidden = true;
    filtersCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    showResults();
  });

  filtersCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      selectedFilters = Array.from(filtersCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      showResults();

      if (selectedFilters.length === 0) {
        filterClear.hidden = true;
        return (filterNoText.hidden = true);
      }

      filterNo.textContent = selectedFilters.length;
      filterClear.hidden = false;
      filterNoText.hidden = false;

      return;
    });
  });
});
