import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray} from './utils';
const EVENT_DESTINATIONS = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const EVENT_DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const eventTypes = [
  {
    name: `Taxi`,
    icon: `🚕`
  },
  {
    name: `Bus`,
    icon: `🚌`
  },
  {
    name: `Train`,
    icon: `🚂`
  },
  {
    name: `Ship`,
    icon: `🛳️`
  },
  {
    name: `Transport`,
    icon: `🚊`
  },
  {
    name: `Drive`,
    icon: `🚗`
  },
  {
    name: `Flight`,
    icon: `✈️`
  },
  {
    name: `Check`,
    icon: `🏨`
  },
  {
    name: `Sightseeing`,
    icon: `🏛️`
  },
  {
    name: `Restaurant`,
    icon: `🍴`
  }
];
const eventOffers = [
  {
    name: `Add luggage`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Switch to comfort class`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Add meal`,
    price: getRandomNumber(0, 50)
  },
  {
    name: `Choose seats`,
    price: getRandomNumber(0, 50)
  }
];
let eventsNumber = 7;

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Получаем данные об одной точке маршрута
const getEvent = () => {
  const event = {
    type: getRandomElement(eventTypes),
    destination: getRandomElement(EVENT_DESTINATIONS),
    offers: getShuffledArray(eventOffers).slice(0, getRandomNumber(0, 3)),
    description: getRandomLengthArray(getShuffledArray(EVENT_DESCRIPTIONS)).slice(1, getRandomNumber(2, 5)).join(` `),
    price: getRandomNumber(10, 500),
    image: `http://picsum.photos/300/150?r=${Math.random()}`,
    startDate: new Date(),
    endDate: new Date()
  };
  event.endDate.setHours(event.startDate.getHours() + 1);
  event.endDate.setMinutes(event.startDate.getMinutes() + 30);
  return event;
};

// Получаем данные о нескольких точках марщрута
const getEvents = (number) => {
  const events = [];
  for (let i = 0; i < number; i++) {
    events.push(getEvent());
  }
  return events;
};

// Генерируем офферы
const getEventOffersHtml = (offers) => {
  let offerElements = [];
  for (let offer of offers) {
    const newOfferElement = `
    <li>
    <button class="trip-point__offer">${offer.name} +&euro; ${offer.price}</button>
    </li>
    `;
    offerElements.push(newOfferElement);
  }
  return offerElements.join(``);
};

// Создаем разметку точек маршрута
const getEventElementsHtml = (events) => {
  const eventElementsHtml = [];
  for (const event of events) {
    const eventElementHtml = `
    <article class="trip-point">
      <i class="trip-icon">${event.type[1]}</i>
      <h3 class="trip-point__title">${event.destination}</h3>
       <p class="trip-point__schedule">
          <span class="trip-point__timetable">10:00&nbsp;&mdash;11:30</span>
          <span class="trip-point__duration">1h 30m</span>
       </p>
       <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
       <ul class="trip-point__offers">
          ${getEventOffersHtml(event.offers)}
      </ul>
      </article>
      `;
    eventElementsHtml.push(eventElementHtml);
  }
  return eventElementsHtml;
};

// Вставляем разметку точек маршрута
const fillEventsBlock = (eventsHtml) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, eventsHtml.join(``));
};

// Удаляем точки маршрута и вставляем новые
const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  const newEvents = getEvents(getRandomNumber(0, 7));
  const newEventsHtml = getEventElementsHtml(newEvents);
  fillEventsBlock(newEventsHtml);
};

export {fillEventsBlock, getEvent, getEvents, eventsNumber, getEventOffersHtml, getEventElementsHtml, filtersBlockClickHandler, eventsBlock};
