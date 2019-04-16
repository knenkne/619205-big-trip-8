import {Sorter} from './sorter';
import {eventsBlock, renderEventsViaDays} from './events';
import {filteredEvents} from './filters';
import {eventsData} from './main';

// Виды сортировки
const sortersNames = [`Event`, `Time`, `Price`];

// Генерируем данные о блоке сортировки
const getSorterBlockData = (names) => {
  const sorterBlockData = {
    sorters: []
  };
  for (const name of names) {
    const sorter = {
      name,
      isChecked: false
    };
    sorterBlockData.sorters.push(sorter);
  }

  sorterBlockData[`sorters`][0].isChecked = true;
  return sorterBlockData;
};

const sortEvents = (events, sorterName) => {
  let sortedEvents = null;
  let eventsToSort = events;

  switch (sorterName) {
    case `sorting-price`:
      sortedEvents = eventsToSort.sort((a, b) => b.price - a.price);
      break;
    case `sorting-time`:
      sortedEvents = eventsToSort.sort((a, b) => b.startDate - a.startDate);
      break;
    default:
      sortedEvents = eventsToSort.sort((a, b) => a.id - b.id);
  }

  return sortedEvents;
};
// Создаем блок сортировки
const createSorterBlockElement = (sorter) => {
  const sorterComponent = new Sorter(sorter);
  console.log(filteredEvents);

  // Сортируем эвенты
  sorterComponent.onSorter = (evt) => {
    const sorterName = evt.target.id;
    const sortedEvents = !filteredEvents.length === 0 ? sortEvents(filteredEvents, sorterName) : sortEvents(eventsData, sorterName);
    console.log(filteredEvents);
    eventsBlock.innerHTML = ``;
    renderEventsViaDays(sortedEvents);
  };

  const sorterBlockElement = sorterComponent.render();
  return sorterBlockElement;
};

// Рендрим блок фильтров
const renderSorterBlockElement = (container) => {
  const sorterBlockData = getSorterBlockData(sortersNames);
  const sorterBlockElement = createSorterBlockElement(sorterBlockData);
  container.prepend(sorterBlockElement);
};

export {renderSorterBlockElement};
