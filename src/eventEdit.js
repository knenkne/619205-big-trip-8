import flatpickr from 'flatpickr';
import moment from 'moment';

import {Component} from './component';
import {eventTypes} from './events';

class EventEdit extends Component {
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

    this._onSubmit = null;
    this._onDelete = null;
  }

  _getOffersHtml() {
    const offers = Object.keys(this._offers);
    const offersHtml = [];
    for (const offer of offers) {
      const offerHtml = `<input class="point__offers-input visually-hidden" type="checkbox" id="${offer}" name="offer" value="${offer}" ${this._offers[offer].isAdded ? `checked` : ``}>
        <label for="add-luggage" class="point__offers-label">
          <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">${this._offers[offer].price}</span>
        </label>
        `;
      offersHtml.push(offerHtml);
    }
    return offersHtml.join(``);
  }

  _getTypesHtml() {
    const typesHtml = [];
    const types = Object.keys(eventTypes);
    for (const type of types) {
      const typeHtml = `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${type}" name="travel-way" value="${type}" ${this._type === type ? `checked` : ``}>
      <label class="travel-way__select-label" for="travel-way-${type}">${eventTypes[type]} ${type}</label>`;
      typesHtml.push(typeHtml);
    }
    return typesHtml.join(``);
  }

  _processForm(formData) {
    const event = {
      type: this._type,
      destination: this._destination,
      offers: this._offers,
      description: this._description,
      price: this._price,
      image: this._image,
      startDate: this._startDate,
      endDate: this._endDate
    };

    const offers = Object.keys(event.offers);
    for (let offer of offers) {
      event.offers[offer].isAdded = false;
    }

    const eventEditMapper = EventEdit.createMapper(event);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      console.log(pair);
      if (eventEditMapper[property]) {
        eventEditMapper[property](value);
      }
    }

    return event;
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onSubmit === `function`) {
      this._onDelete();
    }

  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `<article class="point">
  <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${eventTypes[this._type]}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
          ${this._getTypesHtml()}
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${this._type} to</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

    <div class="point__time">
      choose time
      <input class="point__input" type="text" value="${moment(this._startDate).format(`HH:mm`)}" name="date-start" placeholder="${moment(this._startDate).format(`HH:mm`)}">
      <input class="point__input" type="text" value="${moment(this._endDate).format(`HH:mm`)}" name="date-end" placeholder="${moment(this._endDate).format(`HH:mm`)}">
    </div>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
          ${this._getOffersHtml()}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._description}</p>
        <div class="point__destination-images">
          <img src="${this._image}" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>`.trim();
  }

  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`click`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`button[type="reset"]`).removeEventListener(`click`, this._onDeleteButtonClick.bind(this));
  }

  bind() {
    const typeChoice = this._element.querySelector(`.travel-way__label`);
    const destinationLabel = this._element.querySelector(`.point__destination-label`);
    this._element.querySelector(`.point__button--save`).addEventListener(`click`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`button[type="reset"]`).addEventListener(`click`, this._onDeleteButtonClick.bind(this));
    for (const label of this._element.querySelectorAll(`.travel-way__select-label`)) {
    // Обработчик для каждого типа точки маршрута
      label.addEventListener(`click`, function () {
        // Получаем инпут относящийся к выбранному селекту
        const input = label.previousElementSibling;
        input.setAttribute(`checked`, `checked`);
        typeChoice.textContent = eventTypes[input.value];
        destinationLabel.textContent = `${input.value} to`;
      });
    }

    for (const label of this._element.querySelectorAll(`.point__offers-label`)) {
      label.addEventListener(`click`, function () {
        const input = label.previousElementSibling;
        input.toggleAttribute(`checked`);
      });
    }

    flatpickr(this._element.querySelector(`input[name=date-start]`), {
      "enableTime": true,
      "time_24hr": true,
      "noCalendar": false,
      "altInput": true,
      "altFormat": `H:i`,
      "dateFormat": `Y F d H i`
    });

    flatpickr(this._element.querySelector(`input[name=date-end]`), {
      "enableTime": true,
      "time_24hr": true,
      "noCalendar": false,
      "altInput": true,
      "altFormat": `H:i`,
      "dateFormat": `Y F d H i`
    });
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

  static createMapper(target) {
    return {
      "offer": (value) => {
        target.offers[value].isAdded = true;
      },
      "price": (value) => {
        target.price = value;
      },
      "destination": (value) => {
        target.destination = value;
      },
      "travel-way": (value) => {
        target.type = value;
      },
      "date-start": (value) => {
        if (value.length !== 5) {
          target.startDate = moment(value, `YYYY MMMM DD HH mm`);
        }
      },
      "date-end": (value) => {
        if (value.length !== 5) {
          target.endDate = moment(value, `YYYY MMMM DD HH mm`);
        }
      }
    };
  }
}

export {EventEdit};
