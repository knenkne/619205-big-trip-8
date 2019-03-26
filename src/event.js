import moment from 'moment';

import {Component} from './component';
import {eventTypes} from './events';

class Event extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._startDate = data.startDate;
    this._endDate = data.endDate;

    this._onEdit = null;
  }

  _getOffersHtml() {
    const offers = Object.keys(this._offers);
    let offerElements = [];
    for (let offer of offers) {
      if (this._offers[offer].isAdded) {
        const newOfferElement = `
        <li>
       <button class="trip-point__offer">${offer} +&euro; ${this._offers[offer].price}</button>
       </li>
      `;
        offerElements.push(newOfferElement);
      }
    }
    return offerElements.join(``);
  }

  _getDateHtml() {
    return `<span class="trip-point__timetable">
    ${moment(this._startDate).format(`HH:mm`)} &nbsp;&mdash; ${moment(this._endDate).format(`HH:mm`)}
    </span>
    <span class="trip-point__duration">
    ${moment.utc(moment(this._endDate.diff(this._startDate, `HH:mm`))).format(`H`)}H:${moment.utc(moment(this._endDate.diff(this._startDate, `HH:mm`))).format(`mm`)}M
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
      <h3 class="trip-point__title">${this._type} to ${this._destination}</h3>
       <p class="trip-point__schedule">
          ${this._getDateHtml()}
       </p>
       <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
       <ul class="trip-point__offers">
          ${this._getOffersHtml()}
      </ul>
      </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onEventClick.bind(this));
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
