import {getEventOffersHtml} from './events';
import {createElement} from './utils';

class Event {
  constructor(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._startDate = data.startDate;
    this._endDate = data.endDate;

    this._element = null;
    this._onEdit = null;
  }

  _getDateHtml() {
    return `<span class="trip-point__timetable">
    ${this._startDate.getHours()}:${this._startDate.getMinutes() < 10 ? `0` : ``}${this._startDate.getMinutes()}
    &nbsp;&mdash;
    ${this._endDate.getHours()}:${this._endDate.getMinutes() < 10 ? `0` : ``}${this._endDate.getMinutes()}
    </span>`;
  }

  _onEventClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="trip-point">
      <i class="trip-icon">${this._type.icon}</i>
      <h3 class="trip-point__title">${this._destination}</h3>
       <p class="trip-point__schedule">
          ${this._getDateHtml()}
          <span class="trip-point__duration">1h 30m</span>
       </p>
       <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
       <ul class="trip-point__offers">
          ${getEventOffersHtml(this._offers)}
      </ul>
      </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onEventClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this._element = null;
  }

}

export {Event};
