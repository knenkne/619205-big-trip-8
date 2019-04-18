import {renderFilterBlockElement, controlsMenu} from './filters';
import {renderSorterBlockElement} from './sorters';
import {renderNewEvent} from './new-event';
import {renderEventsViaDays, eventTypes} from './events';
import {TotalCost} from './total-cost';
import {renderMoneyChart, renderTransportChart, renderTimeSpendChart, getPriceCount, getTransportCount, getTimeSpendCount, transportTypes} from './statistic';
import {API} from './api';
import {AUTHORIZATION, END_POINT} from './constants';

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// Элементы управления
const tableBlock = document.querySelector(`#table`);
const statsBlock = document.querySelector(`#stats`);
const tableButton = document.querySelector(`.view-switch__item[href="#table"]`);
const statsButton = document.querySelector(`.view-switch__item[href="#stats"]`);
const newEventButton = document.querySelector(`.trip-controls__new-event`);

// Массивы для дальнейшей работы с данными
let eventsData = [];
let eventsToSort = [];
let eventsToFilter = [];
let destinationsData = [];
let offersData = [];

// Шкалы статистики
const transportChart = renderTransportChart();
const moneyChart = renderMoneyChart();
const timeSpendChart = renderTimeSpendChart();

// Вставляем блок фильтров
renderFilterBlockElement(controlsMenu);

// Вставляем блок сортировки
renderSorterBlockElement(document.querySelector(`main`));

// Вставляем блок цены
const totalCostElement = new TotalCost().render();
const priceBlock = totalCostElement.querySelector(`.trip__total-cost`);
const totaslCostBlock = document.querySelector(`.trip`);
totaslCostBlock.appendChild(totalCostElement);

// Переключаем состояния страницы

// Точки маршрута
tableButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  statsBlock.classList.add(`visually-hidden`);
  tableBlock.classList.remove(`visually-hidden`);
  tableButton.classList.remove(`view-switch__item--active`);
  statsButton.classList.remove(`view-switch__item--active`);
  tableButton.classList.add(`view-switch__item--active`);
});

// Статистика
statsButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  statsBlock.classList.remove(`visually-hidden`);
  tableBlock.classList.add(`visually-hidden`);
  statsButton.classList.add(`view-switch__item--active`);
  tableButton.classList.remove(`view-switch__item--active`);
  moneyChart.data.datasets[0].data = Object.values(getPriceCount(eventsData, Object.keys(eventTypes)));
  transportChart.data.datasets[0].data = Object.values(getTransportCount(eventsData, transportTypes));
  timeSpendChart.data.datasets[0].data = Object.values(getTimeSpendCount(eventsData, Object.keys(eventTypes)));
  transportChart.update();
  moneyChart.update();
  timeSpendChart.update();
});

// Создаем эвент
newEventButton.addEventListener(`click`, renderNewEvent);

api.getEvents()
  .then((events) => {
    eventsData = events;
    eventsToSort = events;
    eventsToFilter = events;
    renderEventsViaDays(eventsData);
    document.querySelector(`.trip-error`).classList.add(`visually-hidden`);
  });

api.getDestinations()
  .then((destinations) => {
    destinationsData = destinations;
  });

api.getOffers()
  .then((offers) => {
    offersData = offers;
  });

export {eventsData};
export {destinationsData};
export {offersData};
export {api};
export {priceBlock};
export {eventsToSort};
export {eventsToFilter};
