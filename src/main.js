import {filtersBlock, pasteFilterElement} from './filter';
import {fillEventsBlock, filtersBlockClickHandler, events} from './events';
// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Вставляем нужные эвенты
fillEventsBlock(events);

filtersBlock.addEventListener(`click`, filtersBlockClickHandler);


