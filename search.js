const suggestions = [
  "Dodaci za mokre prostore",
  "Dodaci za sportske podove",
  "Dodaci za ugradnju",
  "Elastični podovi",
  "Elektrode za varenje",
  "Heterogeni Vinil",
  "Homogeni Vinil",
  "Iglani podovi",
  "Komercijalne Tekstilne Rolne",
  "LVT",
  "Lajsne",
  "Laminat",
  "Linoleum",
  "Mase, prajmeri i lepkovi",
  "Parket",
  "Podloge",
  "Podna i zidna rešenja za mokre prostore",
  "Podovi za kontrolu statičkog elektriciteta",
  "Prateći asortiman",
  "Protivklizni podovi",
  "Specijalni proizvodi",
  "Sportski podovi",
  "Tekstilne ploče",
  "Tekstilni podovi",
  "Tepisi",
  "Tepisoni",
  "Tvrdi podovi",
  "Veštačka trava",
  "Vinil za kuću",
  "Završne i prelazne lajsne",
  "Zaštita i nega",
  "Zidne obloge",
];

document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector(".js-form");
  const inputBox = search.querySelector(".js-search-input");
  const results = search.querySelector(".js-results");
  const submitBtn = search.querySelector(".js-submit");
  const searchResetBtn = search.querySelector(".js-reset");

  // Function to show suggestions
  const showSuggestions = (list) => {
    const listData = list
      .map(
        (data) => `<li class='search__results-item js-result-item'>${data}</li>`
      )
      .join("");
    results.innerHTML = listData;
  };

  // Function to select a suggestion
  const select = (element) => {
    const selectData = element.textContent;
    const webLink = `https://www.tarkett.rs/sr_RS/pretraga/proizvod?search[body]=&filter-category_b2b[]=${selectData}&userQuery=${selectData}`;
    inputBox.value = selectData;
    search.classList.remove("search--active");
    search.setAttribute("action", webLink);
    searchResetBtn.hidden = true;
  };

  inputBox.addEventListener("keyup", (e) => {
    const userValue = e.target.value;
    let emptyArray = [];

    if (userValue) {
      emptyArray = suggestions.filter((data) =>
        data.toLowerCase().includes(userValue.toLowerCase())
      );
      search.classList.add("search--active");
      searchResetBtn.hidden = false;
      showSuggestions(emptyArray);
    } else {
      search.classList.remove("search--active");
      searchResetBtn.hidden = true;
    }
  });

  searchResetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputBox.value = "";
    results.innerHTML = "";
    search.classList.remove("search--active");
    search.setAttribute("action", "");
    searchResetBtn.hidden = true;
    submitBtn.setAttribute("href", "blank");
  });

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-result-item")) {
      select(e.target);
    }
  });
});
