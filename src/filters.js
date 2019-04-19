import moment from 'moment';
import Filter from './filter';
import {renderEventsViaDays} from './events';
import {eventsToFilter} from './main';
import {sortEvents, getSorterName} from './sorters';
import {newEventButton} from './new-event';

// Блок фильтров
const controlsMenu = document.querySelector(`.trip-controls__menus`);
const filtersBlock = document.querySelector(`.trip-filter`);

// Массив с отфильтрованными эвентами
const filteredEvents = [];

// Фильтры
const filtersNames = [`Everything`, `Future`, `Past`];

const getFilterName = (filters) => {
  let filterName = ``;
  for (const filter of filters) {
    if (filter.checked) {
      filterName = filter.id;
    }
  }
  return filterName;
};

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
    const filterName = evt.target.id;
    const filteredEventsData = filterEvents(eventsToFilter, filterName);
    filteredEvents.splice(0, filteredEvents.length);
    for (const filteredEvent of filteredEventsData) {
      filteredEvents.push(filteredEvent);
    }
    const sorters = document.querySelectorAll(`.trip-sorting input`);
    const sorterName = getSorterName(sorters);
    const filteredEventsWithSort = sortEvents(filteredEvents, sorterName);
    newEventButton.disabled = false;
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
const filterEvents = (events, filter) => {
  switch (filter) {
    case `filter-future`:
      return events.filter((event) =>
        moment(event.startDate).isAfter(moment()));

    case `filter-past`:
      return events.filter((event) =>
        moment(event.startDate).isBefore(moment()));
  }
  return events;
};

export {filtersBlock};
export {renderFilterBlockElement};
export {controlsMenu};
export {filteredEvents};
export {filterEvents};
export {getFilterName};
