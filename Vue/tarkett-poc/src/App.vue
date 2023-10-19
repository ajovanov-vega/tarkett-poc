<script setup>
import { ref, watch } from 'vue'

const exampleFilters = {
  thickness: {
    group: 'Thickness',
    items: {
      3_5: {
        name: '3.5',
        value: 'thickness3_5'
      },
      2_5: {
        name: '2.5',
        value: 'thickness2_5'
      },
      0x6: {
        name: '0.6',
        value: 'thickness0_6'
      }
    }
  },
  layingMethod: {
    group: 'Laying Method',
    items: {
      click: {
        name: 'Click',
        value: 'layingMethod-click'
      },
      bonding: {
        name: 'Bonding/Floating',
        value: 'layingMethod-bonding'
      },
      gluing: {
        name: 'Gluing down',
        value: 'layingMethod-gluing'
      }
    }
  },
  hue: {
    group: 'Hue',
    items: {
      dark: {
        name: 'Dark',
        value: 'hue-dark'
      },
      medium: {
        name: 'Medium',
        value: 'hue-medium'
      },
      light: {
        name: 'Light',
        value: 'hue-light'
      }
    }
  },
  surfaceTreatment: {
    group: 'Surface Treatment',
    items: {
      naturaMattLacquer: {
        name: 'Natura Matt Lacquer',
        value: 'surfaceTreatment-natura-matt-lacquer'
      },
      hardwaxOil: {
        name: 'Hardwax Oil',
        value: 'surfaceTreatment-hardwax-oil'
      },
      extraMatt: {
        name: 'Extra Matt',
        value: 'surfaceTreatment-extra-matt'
      },
      varnish: {
        name: 'Varnish',
        value: 'surfaceTreatment-varnish'
      }
    }
  },
  pattern: {
    group: 'Pattern',
    items: {
      bar1: {
        name: '1-bar',
        value: 'pattern-bar1'
      },
      bar2: {
        name: '2-bar',
        value: 'pattern-bar2'
      },
      bar3: {
        name: '3-bar',
        value: 'pattern-bar3'
      },
      gridBoard: {
        name: 'Grid Board',
        value: 'pattern-grid-board'
      },
      herringboneParquet: {
        name: 'Herringbone Parquet',
        value: 'pattern-herringbone-parquet'
      },
      largeSquares: {
        name: 'Large Squares',
        value: 'pattern-large-squares'
      },
      smallSquares: {
        name: 'Small Squares',
        value: 'pattern-small-squares'
      }
    }
  },
  colorFamily: {
    group: 'Color Family',
    items: {
      white: {
        name: 'White',
        value: 'colorFamily-white'
      },
      beige: {
        name: 'Beige',
        value: 'colorFamily-beige'
      },
      grey: {
        name: 'Grey',
        value: 'colorFamily-grey'
      },
      black: {
        name: 'Black',
        value: 'colorFamily-black'
      }
    }
  },
  kindOfWood: {
    group: 'Kind of Wood',
    items: {
      oak: {
        name: 'Oak',
        value: 'kindOfWood-oak'
      },
      box: {
        name: 'Box',
        value: 'kindOfWood-box'
      },
      walnut: {
        name: 'Walnut',
        value: 'kindOfWood-walnut'
      },
      book: {
        name: 'Book',
        value: 'kindOfWood-book'
      },
      birch: {
        name: 'Birch',
        value: 'kindOfWood-birch'
      }
    }
  },
  width: {
    group: 'Width (cm)',
    items: {
      19: {
        name: '19',
        value: 'width-19'
      },
      19_4: {
        name: '19.4',
        value: 'width-19_4'
      },
      19_2: {
        name: '19.2',
        value: 'width-19_2'
      },
      16_2: {
        name: '16.2',
        value: 'width-16_2'
      },
      13_4: {
        name: '13.4',
        value: 'width-13_4'
      },
      12: {
        name: '12',
        value: 'width-12'
      },
      11: {
        name: '11',
        value: 'width-11'
      }
    }
  },
  collection: {
    group: 'Collection',
    items: {
      shade: {
        name: 'Shade',
        value: 'collection-shade'
      },
      pure: {
        name: 'Pure',
        value: 'collection-pure'
      },
      prestige: {
        name: 'Prestige',
        value: 'collection-prestige'
      },
      grace: {
        name: 'Grace',
        value: 'collection-grace'
      },
      viva: {
        name: 'Viva',
        value: 'collection-viva'
      },
      noble: {
        name: 'Noble',
        value: 'collection-noble'
      },
      heritage: {
        name: 'Heritage',
        value: 'collection-heritage'
      },
      segno: {
        name: 'Segno',
        value: 'collection-segno'
      }
    }
  }
}

const exampleData = [
  {
    label: 'Natural Oak',
    filters: [exampleFilters.kindOfWood.items.oak.value],
    image: 'https://home.tarkett.com/media/img/M/TH_RR_ICONIK_Classical_Oak_Natural_001.jpg',
    imageSmall: 'https://home.tarkett.com/media/img/S/TH_RR_ICONIK_Classical_Oak_Natural_001.jpg'
  },
  {
    label: 'Oak Light',
    filters: [exampleFilters.kindOfWood.items.oak.value, exampleFilters.hue.items.light.value],
    image: 'https://home.tarkett.com/media/img/M/TH_RR_ICONIK_French_Oak_Light_001.jpg',
    imageSmall: 'https://home.tarkett.com/media/img/S/TH_RR_ICONIK_French_Oak_Light_001.jpg'
  },
  {
    label: 'Oak Medium',
    filters: [exampleFilters.kindOfWood.items.oak.value, exampleFilters.hue.items.medium.value],
    image: 'https://media.tarkett-image.com/medium/TH_RR_ICONIK_Fumed_Oak_Medium_Brown_001.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_RR_ICONIK_Fumed_Oak_Medium_Brown_001.jpg'
  },
  {
    label: 'Oak Light Grey',
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.hue.items.light.value,
      exampleFilters.pattern.items.gridBoard.value
    ],
    image: 'https://home.tarkett.com/media/img/M/TH_RR_ICONIK_Legacy_Oak_Light_grey_001.jpg',
    imageSmall: 'https://home.tarkett.com/media/img/S/TH_RR_ICONIK_Legacy_Oak_Light_grey_001.jpg'
  },
  {
    label: 'Walnut tres',
    filters: [exampleFilters.kindOfWood.items.walnut.value],
    image: 'https://home.tarkett.com/media/img/M/TH_8577007_8577008_001.jpg',
    imageSmall: 'https://home.tarkett.com/media/img/S/TH_8577007_8577008_001.jpg'
  },
  {
    label: 'Light Walnut',
    filters: [exampleFilters.kindOfWood.items.walnut.value, exampleFilters.hue.items.light.value],
    image: 'https://media.tarkett-image.com/medium/TH_8582002_001_800_800.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_8582002_001_800_800.jpg'
  },
  {
    label: 'Dark Walnut tres',
    filters: [exampleFilters.kindOfWood.items.walnut.value, exampleFilters.hue.items.dark.value],
    image: 'https://media.tarkett-image.com/medium/TH_8577007_8577008_001.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_8577007_8577008_001.jpg'
  },
  {
    label: 'Tundra Oak Spring',
    filters: [
      exampleFilters.kindOfWood.items.oak.value,
      exampleFilters.layingMethod.items.click.value
    ],
    image: 'https://media.tarkett-image.com/medium/TH_7806006_001_800_800.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_7806006_001_800_800.jpg'
  },
  {
    label: 'Tendenza Cool Grey',
    filters: [
      exampleFilters.hue.items.light.value,
      exampleFilters.pattern.items.largeSquares.value
    ],
    image: 'https://media.tarkett-image.com/medium/TH_RR_ICONIK_Tendenza_Cool_Grey_001.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_RR_ICONIK_Tendenza_Cool_Grey_001.jpg'
  },
  {
    label: 'Admiral Dark Brown',
    filters: [exampleFilters.hue.items.dark.value, exampleFilters.pattern.items.smallSquares.value],
    image: 'https://media.tarkett-image.com/medium/TH_LA_SKIRTING_Classic_Walnut_Red_L179.jpg',
    imageSmall: 'https://media.tarkett-image.com/small/TH_LA_SKIRTING_Classic_Walnut_Red_L179.jpg'
  }
]

const exampleCommonSearch = [
  {
    label: 'Rustic Velvet'
  },
  {
    label: 'Watercolor'
  },
  {
    label: 'OK'
  },
  {
    label: 'Target'
  },
  {
    label: 'Optimum'
  }
]

const inputRef = ref(null)
const showFilters = ref(false)
const showSearch = ref(false)
const showEmpty = ref(false)
const formAction = ref('')
const searchList = ref([])
const recommendations = ref([])
const userValue = ref('')
const checkboxes = ref([])
const results = ref([])
const data = exampleData

document.title = 'RFP Tarkett - Search component'

const searchLink = (searchTerm) => {
  return `https://home.tarkett.com/en_EU/search/products?search[body]=${searchTerm}&userQuery=${searchTerm}`
}

const toggleShowFilters = () => {
  showFilters.value = !showFilters.value
}

const toggleShowSearch = () => {
  if (results.value.length > 0) {
    return (showSearch.value = true)
  }
  return (showSearch.value = !showSearch.value)
}

const formActionLink = (text) => {
  if (!text) return (formAction.value = '')
  return (formAction.value = searchLink(text))
}

// Event listeners and event handlers
const handleInputChange = (e) => {
  const typedValue = e.target.value
  const isSomethingTyped = typedValue.length > 0
  userValue.value = typedValue
  formActionLink(typedValue)

  searchList.value = isSomethingTyped
    ? data.filter((filteredData) =>
        filteredData.label.toLowerCase().includes(typedValue.toLowerCase())
      )
    : []
}

const onResetSearch = (e) => {
  e.preventDefault()
  searchList.value = []
  checkboxes.value = []
  userValue.value = ''
  inputRef.value = ''
  showSearch.value = false
  formActionLink()
}

const handleFilterClear = () => {
  checkboxes.value = []
  return filterResults()
}

const handleCheckboxChange = () => filterResults()

const recommendationsList = () => {
  recommendations.value = searchList.value.map((searchData, index) => {
    const regex = new RegExp('(' + userValue.value + ')', 'gi')
    const label = searchData.label
    const parts = label.split(regex)
    const searchQuery = label.toLowerCase()
    const webLink = searchLink(searchQuery)

    return {
      parts,
      webLink
    }
  })
}

const filterResults = () => {
  results.value =
    checkboxes.value.length > 0 || userValue.value.trim() !== ''
      ? data.filter((filteredData) => {
          return (
            (!checkboxes.value.length === 0 && userValue.value.trim() === '') ||
            (checkboxes.value.every((filter) => filteredData.filters.includes(filter)) &&
              (!userValue.value.trim() ||
                filteredData.label.toLowerCase().includes(userValue.value.toLowerCase())))
          )
        })
      : []
}

watch(searchList, () => {
  filterResults()
  recommendationsList()
})

watch(results, () => {
  showEmpty.value =
    (results.value.length === 0 && userValue.value.length > 0) ||
    (results.value.length === 0 && userValue.value.length === 0 && checkboxes.value.length > 0)
})
</script>

<template>
  <main class="main">
    <div class="container">
      <a target="_blank" class="logo" href="https://home.tarkett.com/en_EU">
        <img width="182" height="40" src="./assets/logo.svg" alt="Tarkett" />
      </a>
      <form
        class="search"
        :class="showSearch && 'search--active'"
        :target="formAction && '_blank'"
        method="POST"
        :action="formAction"
      >
        <div class="search__components">
          <div class="search__component">
            <div class="search__input-holder">
              <div class="search__input-prefix">
                <button type="submit" class="search__submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
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
                id="search"
                class="search__input"
                type="text"
                placeholder="Search Products"
                v-model="inputRef"
                @input="(e) => handleInputChange(e)"
                @click="toggleShowSearch"
              />
              <div v-if="userValue.length > 0" class="search__input-affix">
                <button class="search__reset" type="reset" @click="onResetSearch">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 14">
                    <path
                      fill="currentColor"
                      d="m7 8.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7L5.6 7 .7 2.1a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275L7 5.6 11.9.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L8.4 7l4.9 4.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L7 8.4Z"
                    />
                  </svg>
                </button>
              </div>
              <label v-if="userValue.length > 0" class="search__input-label" for="search"
                >Press Enter to Search</label
              >
            </div>
            <div class="search__results-container">
              <div class="search__results-wrapper">
                <!-- Filters -->
                <div class="search__filters" :class="showFilters && 'search__filters--active'">
                  <div class="search__filters-top">
                    <button type="button" class="search__filters-toggle" @click="toggleShowFilters">
                      <span class="search__filters-toggle-text">Filters</span>
                      <span class="search__filters-toggle-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xml:space="preserve"
                          viewBox="0 0 25 15.5"
                        >
                          <path
                            fill="currentColor"
                            d="m2.9 0 9.6 9.6L22.1 0 25 3 12.5 15.5 0 3l2.9-3z"
                          />
                        </svg>
                      </span>
                      <span v-if="checkboxes.length > 0" class="search__filters-toggle-number">
                        <strong>{{ checkboxes.length }}</strong> filters applied
                      </span>
                    </button>
                    <button
                      v-if="checkboxes.length > 0"
                      class="search__filters-clear"
                      type="button"
                      @click="handleFilterClear"
                    >
                      <span class="search__filters-clear-text">Clear all Filters</span>
                      <span class="search__filters-clear-icon">
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
                  </div>
                  <div class="search__filters-container">
                    <div v-if="exampleFilters" class="search__filters-groups">
                      <div
                        v-for="(filtersValue, filtersKey) in exampleFilters"
                        class="search__filters-group"
                        :key="filtersKey"
                      >
                        <h3 class="search__filters-group-title">{{ filtersValue.group }}</h3>
                        <ul class="search__filters-group-list">
                          <li
                            v-for="(valueName, valueKey) in filtersValue.items"
                            class="search__filters-group-list-item"
                            :key="valueKey"
                          >
                            <label class="search__checkbox">
                              <input
                                type="checkbox"
                                v-model="checkboxes"
                                :name="filtersKey"
                                :value="valueName.value"
                                @change="handleCheckboxChange"
                              />
                              {{ valueName.name }}
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Common Search -->
                <div v-if="results.length === 0" class="search__common">
                  <h2 class="search__common-title">Common Searches</h2>
                  <ul class="search__common-list">
                    <li
                      v-for="common in exampleCommonSearch"
                      class="search__common-list-item"
                      :key="common.label.trim()"
                    >
                      <a
                        target="_blank"
                        class="search__common-list-link"
                        :href="`https://home.tarkett.com/en_EU/search/products?search[body]=${common.label.trim()}&userQuery=${common.label.trim()}`"
                        >{{ common.label }}</a
                      >
                    </li>
                  </ul>
                </div>
                <!-- Recommendation search / Do you mean -->
                <div
                  v-if="results.length > 0 && userValue.length > 0"
                  class="search__recommendation"
                >
                  <h2 class="search__recommendation-title">Do you mean</h2>
                  <ul class="search__recommendation-list">
                    <li
                      v-for="(recommendation, index) in recommendations"
                      :key="index"
                      class="search__recommendation-list-item"
                    >
                      <a
                        target="_blank"
                        rel="noreferrer"
                        :href="recommendation.webLink"
                        class="search__recommendation-list-link"
                      >
                        <span v-for="(part, i) in recommendation.parts">
                          <strong v-if="i % 2 === 1" :key="i">{{ part }}</strong>
                          <span v-else :key="i * 100">{{ part }}</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- Search results -->
                <div class="search__results">
                  <div v-if="results.length > 0" class="search__results-top">
                    <h2 class="search__results-title">Top Product Results</h2>
                    <a class="search__results-all" :href="formAction">
                      <span class="search__results-all-text">Show All Products</span>
                      <span class="search__results-all-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xml:space="preserve"
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
                  <div v-if="showEmpty" class="search__results-empty">
                    <span class="search__results-empty-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xml:space="preserve"
                        viewBox="0 0 26.5 26.5"
                      >
                        <path
                          fill="currentColor"
                          d="M12.6 25.3C5.7 25.3 0 19.6 0 12.6S5.7 0 12.6 0c7 0 12.6 5.7 12.6 12.6s-5.6 12.7-12.6 12.7zm0-23.8c-6.1 0-11.1 5-11.1 11.1s5 11.1 11.1 11.1 11.1-5 11.1-11.1-5-11.1-11.1-11.1zM25.8 26.5c-.2 0-.4-.1-.5-.2l-2.5-2.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.5 2.5c.3.3.3.8 0 1.1-.2.2-.4.2-.6.2z"
                        />
                      </svg>
                    </span>
                    <p class="search__results-empty-text">
                      There are no results for searched criteria.<br />Adjust the filters and search
                      term.
                    </p>
                  </div>
                  <ul v-else class="search__results-list">
                    <li
                      v-for="(result, index) in results"
                      class="search__results-list-item"
                      :key="result.id || index"
                    >
                      <a
                        class="search__results-list-link"
                        :href="searchLink(result.label.toLowerCase())"
                      >
                        <picture class="search__results-list-picture">
                          <source media="(min-width:1024px)" :srcset="result.image" />
                          <img
                            :alt="`${result.label}-${index + 1}`"
                            class="search__results-list-image"
                            :src="result.imageSmall"
                          />
                        </picture>
                        <span class="search__results-list-info">
                          <span class="search__results-list-item-title">{{ result.label }}</span>
                          <span class="search__results-list-square-meter">SEK 529 /M²</span>
                          <span class="search__results-list-square-package"
                            >SEK 1,334.00 /PACKAGE</span
                          >
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.search {
  background: var(--color-white);
  border-radius: 8px;
  display: flex;
  margin: 0 auto;
  max-width: 750px;
  position: relative;
  width: 100%;
}

.search__components {
  width: 100%;
}

.search__component {
  position: relative;
}

.search__input {
  border-radius: 5px;
  border: none;
  flex: 1 1 auto;
  font-size: 14px;
  height: 45px;
  line-height: 30px;
  outline: none;
  padding: 13px 0;
}

.search__input-label {
  color: var(--color-cool-gray);
  font-size: 14px;
  padding-right: 16px;
  text-align: right;
  display: none;

  @media only screen and (min-width: 768px) {
    display: inline-flex;
  }
}

.search__input-holder {
  align-items: center;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-black-rgb), 0.08);
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  height: 100%;
}

.search__input-prefix,
.search__input-affix {
  display: inline-flex;
  height: 100%;
}

.search__submit,
.search__reset {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  flex: 1 1 auto;
  justify-content: center;
  padding: 0 16px;
  text-align: center;
  transition: color var(--transition);
  width: auto;
}

.search__reset {
  color: var(--color-cool-gray);
}

.search__submit {
  color: var(--color-darker-gray);
}

.search__submit:not([hidden]),
.search__reset:not([hidden]) {
  display: inline-flex;
}

.search__submit:hover,
.search__reset:hover {
  color: var(--color-darker-gray);
}

.search__submit svg {
  width: 20px;
}

.search__reset svg {
  width: 14px;
}

/* Search filters */

.search__filters-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.search__filters-toggle,
.search__filters-clear {
  -webkit-appearance: none;
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  color: var(--color-darker-gray);
  cursor: pointer;
  display: inline-flex;
  line-height: 1;
  outline: none;
  transition: opacity var(--transition);
}

.search__filters-toggle:hover,
.search__filters-clear:hover {
  opacity: 0.8;
}

.search__filters-toggle {
  font-size: 14px;
}

.search__filters-toggle-icon {
  display: inline-flex;
  justify-content: center;
  text-align: center;
  transform: rotate(0deg);
  transition: transform var(--transition);
  width: 14px;
}

.search__filters-toggle-icon svg {
  width: 7px;
}

.search__filters-toggle-number {
  font-size: 12px;
  padding-left: 8px;
}

.search__filters-clear {
  font-size: 12px;
  text-align: right;
}

.search__filters-clear-icon {
  width: 14px;
}

.search__filters-clear-icon svg {
  width: 8px;
}

.search__filters-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition);
}

.search__filters-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 20vh;

  @media only screen and (min-width: 768px) {
    max-height: none;
  }
}

.search__filters-group-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  height: 95px;
  list-style: none;
  margin: 0;
  padding: 0 3.5px;
}

.search__filters-group-title {
  color: var(--color-navy-blue);
  font-size: 14px;
  font-weight: var(--font-bold);
  line-height: 1.1;
  margin-bottom: 10px;
  padding-top: 10px;
}

.search__filters--active .search__filters-container {
  max-height: 100vh;
}

.search__filters--active .search__filters-toggle-icon {
  transform: rotate(180deg);
}

/* Search results block */

.search__results-container {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0px 2px 16px 0px rgba(var(--color-black-rgb), 0.16);
  left: 0;
  margin: 0 9px 0 20px;
  max-height: 0;
  overflow: hidden;
  position: absolute;
  top: 100%;
  transform: translateY(-6px);
  transition: max-height var(--transition);
  width: calc(100% - 29px);
  will-change: transform;
}

.search--active .search__results-container {
  max-height: 80vh;
}

.search__results-wrapper {
  padding: 16px;
}

.search__results-empty {
  color: rgba(var(--color-gray-rgb), 0.6);
  font-size: 16px;
  line-height: 1.175;
  padding: 39px 20px;
  text-align: center;
}

.search__results-empty-icon {
  display: block;
  margin-bottom: 28px;
  text-align: center;
}

.search__results-empty-icon svg {
  width: 38px;
}

.search__results {
  width: 100%;
}

.search__results-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.search__results-title {
  color: var(--color-darker-gray-rgb);
  font-size: 12px;
  font-weight: var(--font-regular);
}

.search__results-all {
  align-items: center;
  color: var(--color-darker-gray);
  display: inline-flex;
  font-size: 12px;
  line-height: 1.14;
  text-decoration: none;
}

.search__results-all-text {
  display: inline-block;
  overflow: hidden;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search__results-all:hover .search__results-all-text {
  text-decoration: none;
}

.search__results-all-icon {
  display: inline-flex;
  flex: none;
  padding-left: 7px;
}

.search__results-all-icon svg {
  width: 8px;
}

.search__results-list {
  display: flex;
  flex-direction: column;
  gap: var(--search-grid-layout-gap);
  list-style: none;
  max-height: var(--search-grid-layout-scroll);
  overflow-y: auto;
  scrollbar-color: var(--color-darker-gray) var(--color-white);
  scrollbar-width: thin;
  scrollbar-gutter: stable;

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(var(--search-grid-item--min-width), var(--search-grid-item--max-width)), 1fr)
    );
  }
}

.search__results-list::-webkit-scrollbar {
  width: 3px;
}

.search__results-list::-webkit-scrollbar-thumb {
  background-color: var(--color-darker-gray);
  border-radius: 5px;
  border: none;
}

.search__results-list::-webkit-scrollbar-track {
  background: var(--color-white);
}

.search__results-list-link {
  color: var(--color-darker-gray);
  display: flex;
  gap: 8px;
  text-decoration: none;
  transition: opacity var(--transition);
}

.search__results-list-link:hover,
.search__results-list-link:focus {
  opacity: 0.8;
}

.search__results-list-picture {
  flex: none;
  height: 64px;
  width: 64px;

  @media only screen and (min-width: 768px) {
    height: var(--search-grid-image-size);
    width: var(--search-grid-image-size);
  }
}

.search__results-list-image {
  aspect-ratio: 1/1;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.search__results-list-info {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  font-weight: var(--font-medium);
  justify-content: center;
}

.search__results-list-item {
  margin-bottom: 2px;
}

.search__results-list-item-title {
  font-size: 18px;
  font-weight: var(--font-medium);
  margin-bottom: 10px;
}

.search__results-list-square-meter {
  font-size: 16px;
}

.search__results-list-square-package {
  color: rgba(var(--color-darker-gray-rgb), 0.5);
  font-size: 10px;
  line-height: 1;
}

/* Search common and Search recommendation */
.search__common {
  margin-bottom: 8px;
}

.search__common-title,
.search__recommendation-title {
  color: var(--color-darker-gray);
  font-size: 12px;
  font-weight: var(--font-regular);
}

.search__common-list,
.search__recommendation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 8px;
}

.search__common-list-item,
.search__recommendation-list-item {
  display: inline-flex;
}

.search__common-list-link,
.search__recommendation-list-link {
  color: var(--color-darker-gray);
  display: inline-block;
  min-height: 30px;
  padding: 7px 13px;
  transition: opacity var(--transition);
}

.search__common-list-link {
  background-color: var(--color-light-gold);
  border-radius: 4px;
  text-decoration: none;
}

.search__common-list-link:hover,
.search__recommendation-list-link:hover {
  opacity: 0.8;
}

/* Checkbox style */
.search__checkbox {
  align-items: start;
  color: var(--color-darker-gray);
  cursor: pointer;
  display: grid;
  font-size: 12px;
  gap: 3px;
  grid-template-columns: 15px auto;
  line-height: 1;
  transition: opacity var(--transition);
}

.search__checkbox:hover {
  opacity: 0.8;
}

.search__checkbox--disabled {
  color: var(--color-light-gold);
  cursor: not-allowed;
  pointer-events: none;
}

.search__checkbox input[type='checkbox'] {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--color-white);
  border-radius: 4px;
  border: 1px solid var(--color-darker-gray);
  color: currentColor;
  cursor: pointer;
  display: grid;
  font: inherit;
  height: 15px;
  margin: 0;
  place-content: center;
  transform: translateY(-0.075em);
  width: 15px;
}

.search__checkbox input[type='checkbox']::before {
  background-color: var(--color-white);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  content: '';
  height: 0.65em;
  transform-origin: bottom left;
  transform: scale(0);
  transition: transform var(--transition);
  width: 0.65em;
}

.search__checkbox input[type='checkbox']:checked {
  background-color: var(--color-darker-gray);
  color: var(--color-white);
}

.search__checkbox input[type='checkbox']:checked::before {
  transform: scale(1);
}

.search__checkbox input[type='checkbox']:disabled {
  color: var(--color-light-gray);
  cursor: not-allowed;
}
</style>
