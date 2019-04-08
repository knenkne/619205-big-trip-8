import {renderFilterBlockElement, controlsMenu} from './filters';
import {eventsBlock, renderEventElements} from './events';
import {renderMoneyChart, renderTransportChart} from './statistic';
import {API} from './api';

const AUTHORIZATION = `Basic eo0w590ik299a=20`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

let eventsData = [];
let destinationsData = [];
let offersData = [];

const tableBlock = document.querySelector(`#table`);
const statsBlock = document.querySelector(`#stats`);
const tableButton = document.querySelector(`.view-switch__item[href="#table"]`);
const statsButton = document.querySelector(`.view-switch__item[href="#stats"]`);

// Вставляем блок фильтров
renderFilterBlockElement(controlsMenu);

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

api.getEvents()
  .then((events) => {
    eventsData = events;
    renderEventElements(eventsData, eventsBlock);
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
