import moment from 'moment';

import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomBoolean} from './utils';
import {Event} from './event';
import {EventEdit} from './eventEdit';

const EVENT_DESTINATIONS = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const EVENT_DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const eventTypes = {
  "Taxi": `🚕`,
  "Bus": `🚌`,
  "Ship": `🛳️`,
  "Transport": `🚊`,
  "Drive": `🚗`,
  "Flight": `✈️`,
  "Check-in": `🏨`,
  "Sightseeing": `🏛️`,
  "Restaurant": `🍴`
};
const eventOffers = [
  `Add lugage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
];

const generateOffers = (offers) => {
  const filledOffers = {};
  for (let offer of offers) {
    filledOffers[offer] = {};
    filledOffers[offer].price = getRandomNumber(0, 50);
    filledOffers[offer].isAdded = getRandomBoolean();
  }

  const slicedOffers = getShuffledArray(Object.keys(filledOffers)).slice(0, getRandomNumber(0, 3)).reduce((result, key) => {
    result[key] = filledOffers[key];

    return result;
  }, {});
  return slicedOffers;
};

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-day__items`);

// Получаем данные об одной точке маршрута
const getEvent = () => {
  const event = {
    type: getRandomElement(Object.keys(eventTypes)),
    destination: getRandomElement(EVENT_DESTINATIONS),
    offers: generateOffers(eventOffers),
    description: getRandomLengthArray(getShuffledArray(EVENT_DESCRIPTIONS)).slice(1, getRandomNumber(2, 5)).join(` `),
    price: getRandomNumber(10, 500),
    image: `http://picsum.photos/300/150?r=${Math.random()}`,
    startDate: moment(),
    endDate: moment()
  };

  event.startDate.add({
    day: getRandomNumber(-2, 0),
    hour: getRandomNumber(-24, 0),
    minute: getRandomNumber(-60, 0)
  });

  event.endDate.add({
    day: getRandomNumber(0, 2),
    hour: getRandomNumber(0, 24),
    minute: getRandomNumber(0, 60)
  });

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

// Вставляем разметку точек маршрута
const fillEventsBlock = (eventsHtml) => {
  eventsBlock.insertAdjacentHTML(`beforeend`, eventsHtml.join(``));
};

// Создаем карточку на основании данных
const createEventElement = (event) => {
  // Создаем классы на основе данных
  const eventComponent = new Event(event);
  const editEventComponent = new EventEdit(event);

  // Меняем состояние
  eventComponent.onEdit = () => {
    editEventComponent.render();
    eventsBlock.replaceChild(editEventComponent.element, eventComponent.element);
    eventComponent.unrender();
  };

  // Меняем состояние
  editEventComponent.onDelete = () => {
    editEventComponent.unrender();
    const index = eventsData.indexOf(event);
    eventsData.splice(index, 1);
  };

  // Меняем состояние
  editEventComponent.onSubmit = (newObject) => {
    event.price = newObject.price;
    event.destination = newObject.destination;
    event.type = newObject.type;
    event.startDate = newObject.startDate;
    event.endDate = newObject.endDate;
    eventComponent.update(event);
    eventComponent.render();
    eventsBlock.replaceChild(eventComponent.element, editEventComponent.element);
    editEventComponent.unrender();
  };

  // Создаем карточку
  const eventElement = eventComponent.render();

  return eventElement;
};

// Создаем несколько элементов
const createEventElements = (eventsData) => {
  const fragment = document.createDocumentFragment();
  for (const eventData of eventsData) {
    const eventElement = createEventElement(eventData);
    fragment.appendChild(eventElement);
  }
  return fragment;
};

// Рендрим элементы в нужном месте
const renderEventElements = (eventsData, container) => {
  const eventElements = createEventElements(eventsData);
  container.appendChild(eventElements);
};
// Удаляем точки маршрута и вставляем новые
const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  renderEventElements(eventsBlock);
};

const eventsData = getEvents(getRandomNumber(0, 7));

export {eventsData};
export {eventTypes};
export {eventOffers};
export {fillEventsBlock};
export {getEvent};
export {getEvents};
export {filtersBlockClickHandler};
export {eventsBlock};
export {renderEventElements};
