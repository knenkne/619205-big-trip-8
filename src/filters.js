import moment from 'moment';
import Filter from './filter';
import {eventsBlock, renderEventsViaDays} from './events';
import {eventsData, eventsToFilter} from './main';
import {sortEvents, sorterNameToFilter} from './sorters';

// Блок фильтров
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
      name,
      isChecked: false
    };
    filterBlockData.filters.push(filter);
  }
  return filterBlockData;
};

// Создаем блок фильтров
const createFilterBlockElement = (filter) => {
  const filterComponent = new Filter(filter);

  // Фильтруем эвенты
  filterComponent.onFilter = (evt) => {
    if (filteredEvents.length === 0) {
      filteredEvents = eventsData;
    }
    const filterName = evt.target.id;
    const filteredEventsData = filterEvents(eventsToFilter, filterName);
    eventsBlock.innerHTML = ``;
    filteredEvents = filteredEventsData;
    const filteredEventsWithSort = sortEvents(filteredEvents, sorterNameToFilter);
    renderEventsViaDays(filteredEventsWithSort);
  };

  const filterBlockElement = filterComponent.render();
  return filterBlockElement;
};

// Рендрим блок фильтров
const renderFilterBlockElement = (container) => {
  const filterBlockData = getFilterBlockData(filtersNames);
  const filterBlockElement = createFilterBlockElement(filterBlockData);
  container.appendChild(filterBlockElement);
};

// Функция фильтрации
const filterEvents = (events, filterName) => {
  switch (filterName) {
    case `filter-future`:
      return events.filter((event) =>
        moment(event.startDate).isAfter(moment()));

    case `filter-past`:
      return events.filter((event) =>
        moment(event.startDate).isBefore(moment()));
  }
  return events;
};

let filteredEvents = [];

export {filtersBlock};
export {renderFilterBlockElement};
export {controlsMenu};
export {filteredEvents};
