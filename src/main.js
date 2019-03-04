import {filtersBlock, pasteFilterElement} from './filter';
import {fillEventsBlock, filtersBlockClickHandler, getEvents, eventsNumber, events} from './events';
// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Генерируем нужное количество эвентов
getEvents(eventsNumber);

// Вставляем эвенты
fillEventsBlock(events);

filtersBlock.addEventListener(`click`, filtersBlockClickHandler);


