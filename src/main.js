import {filtersBlock, pasteFilterElement} from './filter';
import {fillEventsBlock, getEvents, eventsNumber, getEventElementsHtml, filtersBlockClickHandler} from './events';
// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Генерируем данные о нужном количестве маршрутов
const events = getEvents(eventsNumber);

// Получаем разметку маршрутов
const eventsHtml = getEventElementsHtml(events);

// Вставляем разметку маршрутов
fillEventsBlock(eventsHtml);

// Удаляем точки маршрута и вставляем новые по клику на блок фильтров
filtersBlock.addEventListener(`click`, filtersBlockClickHandler);


