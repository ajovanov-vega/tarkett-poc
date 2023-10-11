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
  const search = document.querySelector(".search");
  const inputBox = search.querySelector(".search__input");
  const recent = search.querySelector(".search__recent");
  const recentListBox = search.querySelector(".search__recent-list");
  const results = search.querySelector(".search__results");
  const submitBtn = search.querySelector(".search__submit");
  const searchResetBtn = search.querySelector(".search__reset");
  let recentList = JSON.parse(localStorage.getItem("search")) || [];;

  // Function to show suggestions
  const showSuggestions = (list) => {
    const listData = list
      .map((data) => `<li class='search__results-item'>${data}</li>`)
      .join("");
    results.innerHTML = listData;
  };

  // Function to select a suggestion
  const select = (element) => {
    const selectData = element.textContent;
    const webLink = `https://www.tarkett.rs/sr_RS/pretraga/proizvod?search[body]=&filter-category_b2b[]=${selectData}&userQuery=${selectData}`;
    inputBox.value = selectData;
    recent.style.display = "none";
    search.classList.remove("search--active");
    search.setAttribute("action", webLink);
    searchResetBtn.hidden = true;
  };

  // Function to show recent searches
  const showRecent = () => {
    recentList = JSON.parse(localStorage.getItem("search")) || [];
    const recentListItems = recentList
      .map((recent) => `<li class='search__recent-item'>${recent}</li>`)
      .join("");

    if (recentList.length) {
      recent.style.display = "block";
      recentListBox.innerHTML = recentListItems;
      const clickableRecentItems = recentListBox.querySelectorAll(
        ".search__recent-item"
      );
      clickableRecentItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          select(e.target);
        });
      });
    } else {
      recent.style.display = "none";
    }
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
      showRecent();
      showSuggestions(emptyArray);
    } else {
      search.classList.remove("search--active");
      searchResetBtn.hidden = true;
      recent.style.display = "none";
    }
  });

  submitBtn.addEventListener("click", () => {
    recentList = JSON.parse(localStorage.getItem("search")) || [];
    recentList.push(inputBox.value);
    localStorage.setItem("search", JSON.stringify(recentList));
  });

  searchResetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputBox.value = "";
    recent.style.display = "none";
    results.innerHTML = "";
    search.classList.remove("search--active");
    search.setAttribute("action", "");
    searchResetBtn.hidden = true;
    submitBtn.setAttribute("href", "blank");
  });

  search.addEventListener("click", (e) => {
    if (e.target.classList.contains("search__results-item")) {
      select(e.target);
    }
  });
});
