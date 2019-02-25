import {getRandomNumber} from './utils';
import {EVENTS} from './const';

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Генерируем отдельный эвент
const getEventElement = (icon, name, from, to, price, firstOffer = ``, secondOffer = ``) => {
  return `
  <article class="trip-point">
    <i class="trip-icon">${icon}</i>
    <h3 class="trip-point__title">${name}</h3>
     <p class="trip-point__schedule">
        <span class="trip-point__timetable">${from}&nbsp;&mdash; ${to}</span>
        <span class="trip-point__duration">1h 30m</span>
     </p>
     <p class="trip-point__price">&euro;&nbsp;${price}</p>
     <ul class="trip-point__offers">
        <li>
        <button class="trip-point__offer">${firstOffer}</button>
        </li>
        <li>
        <button class="trip-point__offer">${secondOffer}</button>
        </li>
    </ul>
    </article>
    `;
};


export const fillEventsBlock = (number) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, getEventElement(`🚕`, `Taxi to Airport`, `10:00`, `11:00`, `20`, `Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`).repeat(number));
};

export const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  fillEventsBlock(getRandomNumber(0, EVENTS));
};
