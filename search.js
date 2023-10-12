const recommendations = [
  "natural oak",
  "oak light",
  "oak medium",
  "oak light grey",
  "walnut tres",
  "light walnut",
  "dark walnut tres",
  "Wood Flooring",
  "All About Wood Floors",
  "Wood Flooring Installation",
  "Caring for Wood Flooring",
  "Laminate Flooring",
  "Laminate Flooring Installation",
  "Caring for Laminated Flooring",
  "Vinyl Flooring",
  "All About Vinyl Floors",
  "Vinyl Flooring Installation",
  "Caring for Vinyl Flooring",
];

document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector(".js-form");
  const inputBox = search.querySelector(".js-search-input");
  const inputLabel = search.querySelector(".js-search-input-label");
  const recommendation = search.querySelector(".js-recommendation");
  const recommendationList = recommendation.querySelector(
    ".js-recommendation-list"
  );
  const submitBtn = search.querySelector(".js-submit");
  const searchResetBtn = search.querySelector(".js-reset");

  const searchLink = (searchTerm) => {
    return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`;
  };

  // Function to show recommendations
  const showRecommendations = (list, userValue) => {
    if (!list || !userValue) {
      recommendation.hidden = true;
      return (recommendationList.innerHTML = "");
    }
    const listData = list
      .map((data) => {
        const regex = new RegExp("(" + userValue + ")", "gi");
        let searchTerm = data;
        searchTerm = searchTerm.replace(regex, "<strong>$1</strong>");
        const searchQuery = data.toLowerCase();
        const webLink = searchLink(searchQuery);

        return `<li class="search__recommendation-list-item">
          <a target="_blank" href="${webLink}" class="search__recommendation-list-link js-recommendation-item" href="blank"
            >${searchTerm}</a
          >`;
      })
      .join("");
    recommendationList.innerHTML = listData;
    recommendation.hidden = false;

    return;
  };

  const actionFill = (text) => {
    if (!text) {
      return (search.action = "");
    }
    return (search.action = searchLink(text));
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
    let emptyArray = [];

    if (userValue) {
      emptyArray = recommendations.filter((data) =>
        data.toLowerCase().includes(userValue.toLowerCase())
      );
      actionFill(userValue);
      inputLabel.hidden = false;
      search.action = userValue.toLowerCase();
      search.classList.add("search--active");
      searchResetBtn.hidden = false;
      showRecommendations(emptyArray, userValue);
      return;
    }

    actionFill();
    inputLabel.hidden = true;
    search.action = "";
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
    showRecommendations();

    return;
  });

  searchResetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    actionFill();
    inputBox.value = "";
    inputLabel.hidden = true;
    search.action = "";
    search.classList.remove("search--active");
    searchResetBtn.hidden = true;
    showRecommendations();
    submitBtn.setAttribute("href", "blank");
  });

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-recommendation-item")) {
      select(e.target);
    }
  });
});
