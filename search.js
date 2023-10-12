const recommendations = [
  "Natural Oak",
  "Oak Light",
  "Oak medium",
  "Oak light grey",
  "Walnut tres",
  "Light Walnut",
  "Dark Walnut tres",
  "Wood Flooring",
  "Laminate Flooring",
  "Caring for Laminated Flooring",
  "Vinyl Flooring",
  "Caring for Vinyl Flooring",
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
  const submitBtn = search.querySelector(".js-submit");
  const searchResetBtn = search.querySelector(".js-reset");
  const searchAll = search.querySelector(".js-results-all");

  const searchLink = (searchTerm) => {
    return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`;
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
        let searchTerm = data;
        searchTerm = searchTerm.replace(regex, "<strong>$1</strong>");
        const searchQuery = data.toLowerCase();
        const webLink = searchLink(searchQuery);
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
    if (!list || !userValue) {
      return (searchList.innerHTML = "");
    }
    const listData = list
      .map((data) => {
        const searchQuery = data.toLowerCase();
        const webLink = searchLink(searchQuery);
        searchEmpty.hidden = true;
        searchList.hidden = false;

        return `<li class="search__results-list-item">
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
                        >${data}</span
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
    searchContainer.hidden = true;
    inputLabel.hidden = true;
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
  };

  inputBox.addEventListener("keyup", (e) => {
    const userValue = e.target.value;
    let searchList = [];

    if (userValue) {
      searchList = recommendations.filter((data) =>
        data.toLowerCase().includes(userValue.toLowerCase())
      );
      searchContainer.hidden = false;
      actionFill(userValue);
      inputLabel.hidden = false;
      search.classList.add("search--active");
      searchResetBtn.hidden = false;
      showRecommendations(searchList, userValue);
      showResults(searchList, userValue);
      return;
    }

    searchContainer.hidden = true;
    actionFill();
    inputLabel.hidden = true;
    search.classList.remove("search--active");
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
  });

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-recommendation-item")) {
      select(e.target);
    }
  });
});
