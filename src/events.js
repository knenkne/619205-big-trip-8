import moment from 'moment';

import {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomBoolean} from './utils';
import {Event} from './event';
import {EventEdit} from './eventEdit';
import {eventsData, api, priceBlock} from './main';
import {EventDay} from './event-day';

const EVENT_DESTINATIONS = [`Paris`, `Rome`, `Tokio`, `Munich`, `New York`];
const EVENT_DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const eventTypes = {
  "taxi": `🚕`,
  "bus": `🚌`,
  "ship": `🛳️`,
  "train": `🚊`,
  "drive": `🚗`,
  "flight": `✈️`,
  "check-in": `🏨`,
  "sightseeing": `🏛️`,
  "restaurant": `🍴`
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
const eventsBlock = document.querySelector(`.trip-points`);

// Итоговая стоимость
const getTotaslCost = (events) => {
  let updatedPrice = 0;

  for (let event of events) {
    updatedPrice += event[`price`];
  }

  priceBlock.textContent = `€ ${updatedPrice}`;
};

// Получаем дни и соответсвующие им эвенты
const getSortedEventsByDays = (events) => {
  let result = {};
  for (let event of events) {
    const eventDay = moment(event.startDate).format(`D MMM YY`);

    if (!result[eventDay]) {
      result[eventDay] = [];
    }
    result[eventDay].push(event);
  }

  return result;
};

// Рендрим эвенты в соответсвующие дни
const renderEventsViaDays = (days) => {
  const eventsSortedByDays = getSortedEventsByDays(days);

  Object.entries(eventsSortedByDays).forEach((eventSortedByDay) => {
    const [day, events] = eventSortedByDay;
    const eventDay = new EventDay(day).render();
    const eventsList = eventDay.querySelector(`.trip-day__items`);
    eventsBlock.appendChild(eventDay);
    renderEventElements(events, eventsList);
  });
  getTotaslCost(eventsData);
};

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
    day: getRandomNumber(-2, 2),
    hour: getRandomNumber(-24, 24),
    minute: getRandomNumber(-60, 24)
  });

  event.endDate.add({
    day: getRandomNumber(2, 4),
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
const createEventElement = (event, day) => {
  // Создаем классы на основе данных
  const eventComponent = new Event(event);
  const editEventComponent = new EventEdit(event);

  // Меняем состояние
  eventComponent.onEdit = () => {
    editEventComponent.render();
    day.replaceChild(editEventComponent.element, eventComponent.element);
    eventComponent.unrender();
  };

  editEventComponent.onEsc = () => {
    eventComponent.render();
    day.replaceChild(eventComponent.element, editEventComponent.element);
    editEventComponent.unrender();
  };

  // Меняем состояние
  editEventComponent.onDelete = ({id}) => {
    const saveButton = editEventComponent.element.querySelector(`.point__button[type="submit"]`);
    const deleteButton = editEventComponent.element.querySelector(`.point__button[type="reset"]`);
    const inputs = editEventComponent.element.querySelectorAll(`input`);

    const block = () => {
      for (const input of inputs) {
        input.disabled = true;
      }

      saveButton.disabled = true;
      deleteButton.textContent = `Deleting...`;
      deleteButton.disabled = true;
      editEventComponent.element.style.boxShadow = `0 11px 20px 0 rgba(0,0,0,0.22)`;
    };

    const unblock = () => {
      for (const input of inputs) {
        input.disabled = false;
      }

      saveButton.disabled = false;
      deleteButton.textContent = `Delete`;
      deleteButton.disabled = false;
    };

    block();
    api.deleteEvent({id})
    .then(() => {
      unblock();
      editEventComponent.unrender();
      if (!day.firstChild) {
        day.parentNode.remove();
      }
      api.getEvents()
      .then((events) => {
        getTotaslCost(events);
        document.querySelector(`.trip-error`).classList.add(`visually-hidden`);
      });
    })
    .catch(() => {
      editEventComponent.shake();
      unblock();
    });
  };

  // Меняем состояние
  editEventComponent.onSubmit = (newObject) => {
    event.price = Number.parseInt(newObject.price, 10);
    event.destination = newObject.destination;
    event.type = newObject.type;
    event.startDate = newObject.startDate;
    event.endDate = newObject.endDate;
    event.isFavorite = newObject.isFavorite;

    const saveButton = editEventComponent.element.querySelector(`.point__button[type="submit"]`);
    const deleteButton = editEventComponent.element.querySelector(`.point__button[type="reset"]`);
    const inputs = editEventComponent.element.querySelectorAll(`input`);

    const block = () => {
      for (const input of inputs) {
        input.disabled = true;
      }

      saveButton.disabled = true;
      saveButton.textContent = `Saving...`;
      deleteButton.disabled = true;
      editEventComponent.element.style.boxShadow = `0 11px 20px 0 rgba(0,0,0,0.22)`;
    };

    const unblock = () => {
      for (const input of inputs) {
        input.disabled = false;
      }

      saveButton.disabled = false;
      saveButton.textContent = `Save`;
      deleteButton.disabled = false;
    };

    block();

    api.updateEvent({id: event.id, data: event.toRAW()})
    .then(() => {
      unblock();
      eventComponent.update(event);
      eventComponent.render();
      day.replaceChild(eventComponent.element, editEventComponent.element);
      editEventComponent.unrender();
      api.getEvents()
      .then((events) => {
        getTotaslCost(events);
        document.querySelector(`.trip-error`).classList.add(`visually-hidden`);
      });
    })
    .catch(() => {
      editEventComponent.shake();
      unblock();
    });
  };

  // Создаем карточку
  const eventElement = eventComponent.render();

  return eventElement;
};

// Создаем несколько элементов
const createEventElements = (events, day) => {
  const fragment = document.createDocumentFragment();
  for (const event of events) {
    const eventElement = createEventElement(event, day);
    fragment.appendChild(eventElement);
  }
  return fragment;
};

// Рендрим элементы в нужном месте
const renderEventElements = (events, day) => {
  const eventElements = createEventElements(events, day);
  day.appendChild(eventElements);
};
// Удаляем точки маршрута и вставляем новые
const filtersBlockClickHandler = () => {
  eventsBlock.innerHTML = ``;
  renderEventElements(eventsBlock);
};

export {eventTypes};
export {eventOffers};
export {fillEventsBlock};
export {getEvent};
export {getEvents};
export {filtersBlockClickHandler};
export {eventsBlock};
export {renderEventElements};
export {renderEventsViaDays};
export {getTotaslCost};
