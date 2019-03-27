import {Filter} from './filter';

// Блок фильтров
const controlsBlock = document.querySelector(`.trip-controls`);
const controlsMenu = document.querySelector(`.trip-controls__menus`);
const filtersBlock = document.querySelector(`.trip-filter`);
// Фильтры
const filtersNames = [`Everything`, `Future`, `Past`];


// Генерируем данные о блоке фильтров
const getFilterBlockData = (names) => {
  const filterBlockData = {
    filters: []
  };
  for (const name of names) {
    const filter = {
      name
    };
    filterBlockData.filters.push(filter);
  }
  return filterBlockData;
};

// Создаем блок фильтров
const createFilterBlockElement = (filter) => {
  const filterComponent = new Filter(filter);
  console.log(filterComponent);
  filterComponent.onFilter = (evt) => {
    const filterName = evt.target.id;
    console.log(filterName);
  };

  const filterBlockElement = filterComponent.render();
  return filterBlockElement;
};

// Рендрим блок фильтров
const renderFilterBlockElement = (container) => {
  const filterBlockData = getFilterBlockData(filtersNames);
  const filterBlockElement = createFilterBlockElement(filterBlockData);
  console.log(filterBlockElement);
  container.appendChild(filterBlockElement);
};

export {filtersBlock};
export {renderFilterBlockElement};
export {controlsMenu};
