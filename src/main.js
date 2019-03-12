import {filtersBlock, pasteFilterElement} from './filter';
import {fillEventsBlock, eventsBlock, getEvent, getEvents, eventsNumber, getEventElementsHtml, renderEventElements, filtersBlockClickHandler} from './events';
import {Event} from './event';
import {EventEdit} from './eventEdit';
import {getRandomNumber} from './utils';

// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Рендрим карточки точек маршрута в нужно месте
renderEventElements(eventsBlock);

// Генерируем новые карточки по нажатию на клик
filtersBlock.addEventListener(`click`, filtersBlockClickHandler);
