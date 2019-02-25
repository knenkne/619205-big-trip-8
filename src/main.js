import {filtersBlock} from './filter';
import {pasteFilterElement} from './filter';
import {EVENTS} from './const';
import {fillEventsBlock} from './events';
import {filtersBlockClickHandler} from './events';

// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Вставляем нужные эвенты
fillEventsBlock(EVENTS);

filtersBlock.addEventListener(`click`, filtersBlockClickHandler);


