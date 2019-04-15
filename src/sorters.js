import {Sorter} from './sorter';
import {eventsData} from './main';
import {eventsBlock, renderEventsViaDays} from './events';
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

  switch (sorterName) {
    case `sorting-price`:
      sortedEvents = events.sort((a, b) => b.price - a.price);
      break;
    case `sorting-time`:
      sortedEvents = events.sort((a, b) => b.startDate - a.startDate);
      break;
    default:
      sortedEvents = events.sort((a, b) => a.id - b.id);
  }

  return sortedEvents;
};
// Создаем блок сортировки
const createSorterBlockElement = (sorter) => {
  const sorterComponent = new Sorter(sorter);

  // Сортируем эвенты
  sorterComponent.onSorter = (evt) => {
    const sorterName = evt.target.id;
    const sortedEvents = sortEvents(eventsData, sorterName);
    console.log(sortedEvents);
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
