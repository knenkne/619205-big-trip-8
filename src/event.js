import moment from 'moment';

import {Component} from './component';
import {eventTypes} from './events';
import {offersSetting} from './constants';

class Event extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._startDate = data.startDate;
    this._endDate = data.endDate;
    this._isFavorite = data.isFavorite;

    this._onEdit = null;

    this._onEventClick = this._onEventClick.bind(this);
  }

  _getOffersHtml() {
    const offers = this._offers.slice(0, offersSetting.max);
    let offerElements = [];
    for (let offer of offers) {
      if (offer.accepted) {
        const newOfferElement = `
        <li>
       <button class="trip-point__offer">${offer.title}</button>
       </li>
      `;
        offerElements.push(newOfferElement);
      }
    }
    return offerElements.join(``);
  }

  _getDuration() {
    const getDaysDuration = () => moment.utc(moment(this._endDate).diff(this._startDate)).format(`D`) - 1;
    const getHoursDuration = () => moment.utc(moment(this._endDate).diff(this._startDate)).format(`H`);
    const getMinutesDuration = () => moment.utc(moment(this._endDate).diff(this._startDate)).format(`m`);

    const duration = `${getDaysDuration() > 0 ? `${getDaysDuration()}D` : ``} ${getHoursDuration() > 0 ? `${getHoursDuration()}H` : ``} ${getMinutesDuration() > 0 ? `${getMinutesDuration()}M` : ``}`;
    return duration;
  }

  _getDateHtml() {
    return `<span class="trip-point__timetable">
    ${moment(this._startDate).format(`HH:mm`)} &nbsp;&mdash; ${moment(this._endDate).format(`HH:mm`)}
    </span>
    <span class="trip-point__duration">
    ${this._getDuration()}
    </span>
    `;
  }

  _onEventClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="trip-point">
      <i class="trip-icon">${eventTypes[this._type]}</i>
      <h3 class="trip-point__title">${this._type.charAt(0).toUpperCase() + this._type.slice(1)} to ${this._destination}</h3>
       <p class="trip-point__schedule">
          ${this._getDateHtml()}
       </p>
       <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
       <ul class="trip-point__offers">
          ${this._getOffersHtml()}
      </ul>
      </article>`.trim();
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEventClick);
  }

  bind() {
    this._element.addEventListener(`click`, this._onEventClick);
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._startDate = data.startDate;
    this._endDate = data.endDate;
  }

}

export {Event};
