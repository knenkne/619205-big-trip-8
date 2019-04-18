import moment from 'moment';

import Event from './event';
import EventEdit from './event-edit';
import {eventsData, api, priceBlock} from './main';
import EventDay from './event-day';

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

// Блок эвентов
const eventsBlock = document.querySelector(`.trip-points`);

// Итоговая стоимость
const getTotalCost = (events) => {
  let totalCost = 0;

  for (const event of events) {
    totalCost += event.price;

    for (const offer of event.offers) {
      if (offer.accepted) {
        totalCost += offer.price;
      }
    }
  }

  priceBlock.textContent = `€ ${totalCost}`;
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

  eventsBlock.innerHTML = ``;
  for (const eventSortedByDay of Object.entries(eventsSortedByDays)) {
    const [day, events] = eventSortedByDay;
    const eventDay = new EventDay(day).render();
    const eventsList = eventDay.querySelector(`.trip-day__items`);
    eventsBlock.appendChild(eventDay);
    renderEventElements(events, eventsList);
  }
  getTotalCost(eventsData);
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
    if (!isEventOpened) {
      editEventComponent.render();
      day.replaceChild(editEventComponent.element, eventComponent.element);
      eventComponent.unrender();
      isEventOpened = true;
    }
  };

  editEventComponent.onEsc = () => {
    eventComponent.render();
    day.replaceChild(eventComponent.element, editEventComponent.element);
    editEventComponent.unrender();
    isEventOpened = false;
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
      const eventToDeleteIndex = eventsData.findIndex((eventToDelete) => eventToDelete.id === id);
      eventsData.splice(eventToDeleteIndex, 1);
      getTotalCost(eventsData);
      isEventOpened = false;
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
        getTotalCost(events);
        document.querySelector(`.trip-error`).classList.add(`visually-hidden`);
        isEventOpened = false;
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

let isEventOpened = false;

export {eventTypes};
export {eventOffers};
export {fillEventsBlock};
export {filtersBlockClickHandler};
export {eventsBlock};
export {renderEventElements};
export {renderEventsViaDays};
export {getTotalCost};
