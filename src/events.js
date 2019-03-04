import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomMapElement} from './utils';
const eventTypes = new Map([
  [`Taxi`, `🚕`],
  [`Bus`, `🚌`],
  [`Train`, `🚂`],
  [`Ship`, `🛳️`],
  [`Transport`, `🚊`],
  [`Drive`, `🚗`],
  [`Flight`, `✈️`],
  [`Check`, `🏨`],
  [`Sightseeing`, `🏛️`],
  [`Restaurant`, `🍴`]
]);
const eventDestinations = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const eventOffers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const eventDescriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
let eventsNumber = 7;
let events = [];
// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Генерируем отдельный эвент
const getEventElement = (event) => {
  // Генерируем офферы
  const getEventOffersElement = () => {
    let offerElements = [];
    for (const offer of event.offers) {
      const newOfferElement = `
      <li>
      <button class="trip-point__offer">${offer} +&euro; ${getRandomNumber(0, 50)}</button>
      </li>
      `;
      offerElements.push(newOfferElement);
    }
    return offerElements.join(``);
  };
  return `
  <article class="trip-point">
    <i class="trip-icon">${event.type[1]}</i>
    <h3 class="trip-point__title">${event.destination}</h3>
     <p class="trip-point__schedule">
        <span class="trip-point__timetable">10:00&nbsp;&mdash;11:30</span>
        <span class="trip-point__duration">1h 30m</span>
     </p>
     <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
     <ul class="trip-point__offers">
        ${getEventOffersElement()}
    </ul>
    </article>
    `;
};


const fillEventsBlock = (array) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, array.join(``));
};

const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  events = [];
  getEvents(getRandomNumber(0, 7));
  fillEventsBlock(events);
};


const getEvents = (number) => {
  for (let i = 0; i < number; i++) {
    const event = {
      type: getRandomMapElement(eventTypes),
      destination: getRandomElement(eventDestinations),
      offers: getShuffledArray(eventOffers).slice(0, getRandomNumber(0, 3)),
      description: getRandomLengthArray(getShuffledArray(eventDescriptions)).slice(1, getRandomNumber(2, 5)).join(` `),
      price: getRandomNumber(10, 500),
      image: `http://picsum.photos/300/150?r=${Math.random()}`
    };
    const eventCard = getEventElement(event);
    events.push(eventCard);
  }
};
export {events, fillEventsBlock, filtersBlockClickHandler, getEvents, eventsNumber};
