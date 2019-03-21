import {filtersBlock, pasteFilterElement} from './filter';
import {eventsBlock, renderEventElements, filtersBlockClickHandler} from './events';


// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Рендрим карточки точек маршрута в нужно месте
renderEventElements(eventsBlock);

// Генерируем новые карточки по нажатию на клик
filtersBlock.addEventListener(`click`, filtersBlockClickHandler);
