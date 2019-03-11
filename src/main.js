import {filtersBlock, pasteFilterElement} from './filter';
import {fillEventsBlock, eventsBlock, getEvent, getEvents, eventsNumber, getEventElementsHtml, filtersBlockClickHandler} from './events';
import {Event} from './event';
import {EventEdit} from './eventEdit';

// Вставляем нужные фильтры
pasteFilterElement(`Everything`, false, true);
pasteFilterElement(`Future`);
pasteFilterElement(`Past`);

// Генерируем данные об одной точке маршрута
const event = getEvent();

// Создаем карточку о точке маршрута
const eventComponent = new Event(event);
const editEventComponent = new EventEdit(event);

// Вставляем карточку
eventsBlock.appendChild(eventComponent.render());

// Меняем состояние
eventComponent.onEdit = () => {
  editEventComponent.render();
  eventsBlock.replaceChild(editEventComponent.element, eventComponent.element);
  eventComponent.unrender();
};

// Меняем состояние
editEventComponent.onSubmit = () => {
  eventComponent.render();
  eventsBlock.replaceChild(eventComponent.element, editEventComponent.element);
  editEventComponent.unrender();
};

filtersBlock.addEventListener(`click`, filtersBlockClickHandler);
