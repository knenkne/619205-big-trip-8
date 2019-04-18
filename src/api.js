import {AdapterEvent} from './adapter-event';
import {SuccessStatusCodes} from './constants';
import {Method} from './constants';

const checkStatus = (response) => {
  if (response.status >= SuccessStatusCodes.MIN && response.status < SuccessStatusCodes.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    document.querySelector(`.trip-error`).textContent = `Loading route...`;
    document.querySelector(`.trip-error`).classList.remove(`visually-hidden`);
    return this._load({url: `points`})
    .then(toJSON)
    .then(AdapterEvent.parseEvents)
    .catch(() => {
      document.querySelector(`.trip-error`).textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
      document.querySelector(`.trip-error`).classList.remove(`visually-hidden`);
    });
  }


  createEvent({event}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then(toJSON)
    .then(AdapterEvent.parseEvent);
  }

  updateEvent({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then(toJSON)
    .then(AdapterEvent.parseEvent);
  }

  deleteEvent({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  getDestinations() {
    return this._load({url: `destinations`})
    .then(toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
    .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
        .then(checkStatus)
        .catch((err) => {
          throw err;
        });
  }
};

export {API};
