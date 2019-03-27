import {renderFilterBlockElement, controlsBlock, controlsMenu} from './filters';
import {eventsBlock, renderEventElements, filtersBlockClickHandler, eventsData} from './events';


// Вставляем блок фильтров
renderFilterBlockElement(controlsMenu);

// Рендрим карточки точек маршрута в нужно месте
renderEventElements(eventsData, eventsBlock);

// Генерируем новые карточки по нажатию на клик
// filtersBlock.addEventListener(`click`, filtersBlockClickHandler);
