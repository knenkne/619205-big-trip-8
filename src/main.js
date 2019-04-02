import {renderFilterBlockElement, controlsMenu} from './filters';
import {eventsBlock, renderEventElements, eventsData} from './events';
import {renderMoneyChart, renderTransportChart} from './statistic';


const tableBlock = document.querySelector(`#table`);
const statsBlock = document.querySelector(`#stats`);
const menuButtons = document.querySelectorAll(`.view-switch__item`);
const tableButton = document.querySelector(`.view-switch__item[href="#table"]`);
const statsButton = document.querySelector(`.view-switch__item[href="#stats"]`);

// Вставляем блок фильтров
renderFilterBlockElement(controlsMenu);

// Рендрим карточки точек маршрута в нужно месте
renderEventElements(eventsData, eventsBlock);

// Переключаем состояния страницы
tableButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  statsBlock.classList.add(`visually-hidden`);
  tableBlock.classList.remove(`visually-hidden`);
  tableButton.classList.remove(`view-switch__item--active`);
  statsButton.classList.remove(`view-switch__item--active`);
  tableButton.classList.add(`view-switch__item--active`);
});

statsButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  statsBlock.classList.remove(`visually-hidden`);
  tableBlock.classList.add(`visually-hidden`);
  statsButton.classList.add(`view-switch__item--active`);
  tableButton.classList.remove(`view-switch__item--active`);
  renderMoneyChart();
  renderTransportChart();
});


