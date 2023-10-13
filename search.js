const recommendations = [
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

document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector(".js-search-form");
  const searchContainer = search.querySelector(".js-search-container");
  const searchEmpty = search.querySelector(".js-search-empty");
  const searchList = search.querySelector(".js-search-list");
  const inputBox = search.querySelector(".js-search-input");
  const inputLabel = search.querySelector(".js-search-input-label");
  const recommendation = search.querySelector(".js-recommendation");
  const recommendationList = recommendation.querySelector(
    ".js-recommendation-list"
  );
  const common = search.querySelector(".js-common");
  const submitBtn = search.querySelector(".js-submit");
  const searchResetBtn = search.querySelector(".js-reset");
  const searchAll = search.querySelector(".js-results-all");
  const filters = search.querySelector(".js-filters");
  const filtersListBox = search.querySelector(".js-filters-list");
  const filterToggle = search.querySelector(".js-filter-toggle");
  const filterNoText = filters.querySelector(".js-filter-no-text");
  const filterNo = filters.querySelector(".js-filter-no");
  const filterClear = filters.querySelector(".js-filter-clear");
  const filtersCheckboxes = filtersListBox.querySelectorAll(
    "input[type=checkbox]"
  );
  let filtersList = [];

  const searchLink = (searchTerm) => {
    return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`;
  };

  const toggleShowFilters = () => {
    if (filters.classList.contains("search__filters--active")) {
      return filters.classList.remove("search__filters--active");
    }
    return filters.classList.add("search__filters--active");
  };

  const toggleShowSearch = () => {
    if (inputBox.value.length !== 0) return;
    if (searchContainer.hidden) {
      return (searchContainer.hidden = false);
    }

    return (searchContainer.hidden = true);
  };

  // Function to show recommendations
  const showRecommendations = (list, userValue) => {
    recommendation.hidden = true;
    if (!list || !userValue) {
      return (recommendationList.innerHTML = "");
    }
    const listData = list
      .map((data) => {
        const regex = new RegExp("(" + userValue + ")", "gi");
        let searchTerm = data.label;
        searchTerm = searchTerm.replace(regex, "<strong>$1</strong>");
        const searchQuery = data.label.toLowerCase();
        const webLink = searchLink(searchQuery);

        if (!filters.classList.contains("search__filters--active"))
          recommendation.hidden = false;

        return `<li class="search__recommendation-list-item">
          <a target="_blank" href="${webLink}" class="search__recommendation-list-link js-recommendation-item" href="blank"
            >${searchTerm}</a
          >`;
      })
      .join("");
    return (recommendationList.innerHTML = listData);
  };

  // Function to show recommendations
  const showResults = (list, userValue) => {
    searchList.hidden = true;
    searchEmpty.hidden = false;
    searchAll.hidden = true;

    if (!list || !userValue) {
      return (searchList.innerHTML = "");
    }
    const listData = list
      .map((data) => {
        const searchQuery = data.label.toLowerCase();
        const webLink = searchLink(searchQuery);
        searchEmpty.hidden = true;
        searchList.hidden = false;
        searchAll.hidden = false;

        return `<li class="search__results-list-item" data-filters="${data.filters}">
                  <a class="search__results-list-link" href="${webLink}" target="_blank">
                    <picture class="search__results-list-picture">
                      <source
                        media="(min-width:1024px)"
                        srcset="./assets/images/example-image-big.jpg"
                      />
                      <img
                        class="search__results-list-image"
                        src="./assets/images/example-image-small.jpg"
                        alt="${userValue}"
                      />
                    </picture>
                    <span class="search__results-list-info">
                      <span class="search__results-list-item-title"
                        >${data.label}</span
                      >
                      <span class="search__results-list-square-meter"
                        >SEK 529 /M²</span
                      >
                      <span class="search__results-list-square-package"
                        >SEK 1,334.00 /PACKAGE</span
                      >
                    </span>
                  </a>
                </li>`;
      })
      .join("");
    return (searchList.innerHTML = listData);
  };

  const actionFill = (text) => {
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
    actionFill(selectData);
    inputBox.value = selectData;
    inputLabel.hidden = true;
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
  };

  inputBox.addEventListener("keyup", (e) => {
    const userValue = e.target.value;
    let searchList = [];

    if (userValue) {
      searchList = recommendations.filter((data) =>
        data.label.toLowerCase().includes(userValue.toLowerCase())
      );
      actionFill(userValue);
      inputLabel.hidden = false;
      search.classList.add("search--active");
      searchResetBtn.hidden = false;
      common.hidden = true;
      showRecommendations(searchList, userValue);
      showResults(searchList, userValue);
      return;
    }

    actionFill();
    inputLabel.hidden = true;
    common.hidden = false;
    search.classList.remove("search--active");
    if (!filters.classList.contains("search__filters--active"))
      common.hidden = false;
    searchResetBtn.hidden = true;
    showRecommendations();
    showResults();

    return;
  });

  searchResetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchContainer.hidden = true;
    actionFill();
    inputBox.value = "";
    inputLabel.hidden = true;
    search.action = "";
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
    showRecommendations();
    showResults();
    submitBtn.setAttribute("href", "blank");
    toggleShowSearch();
  });

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-recommendation-item")) {
      select(e.target);
    }
  });

  inputBox.addEventListener("click", toggleShowSearch);

  filterToggle.addEventListener("click", toggleShowFilters);

  filterClear.addEventListener("click", () => {
    filtersList = [];
    filterClear.hidden = true;
    filterNoText.hidden = true;
    filtersCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  });

  filtersCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filtersList = Array.from(filtersCheckboxes)
        .filter((i) => i.checked)
        .map((i) => i.value);

      if (filtersList.length === 0) {
        filterClear.hidden = true;
        return (filterNoText.hidden = true);
      }
      filterNo.textContent = filtersList.length;
      filterClear.hidden = false;
      filterNoText.hidden = false;

      console.log(filtersList);

      return;
    });
  });
});
