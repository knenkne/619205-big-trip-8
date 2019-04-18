import moment from 'moment';

export default class AdapterEvent {
  constructor(data) {
    this.id = data[`id`];
    this.price = data[`base_price`];
    this.startDate = data[`date_from`];
    this.endDate = data[`date_to`];
    this.destination = data[`destination`][`name`];
    this.description = data[`destination`][`description`];
    this.pictures = data[`destination`][`pictures`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.type = data[`type`];
    this.offers = data[`offers`];
  }

  toRAW() {
    return {
      'id': this.id,
      'base_price': this.price,
      'date_from': moment(this.startDate).toDate().getTime(),
      'date_to': moment(this.endDate).toDate().getTime(),
      'destination': {
        'name': this.destination,
        'description': this.description,
        'pictures': this.pictures
      },
      'is_favorite': this.isFavorite,
      'type': this.type,
      'offers': this.offers
    };
  }

  static parseEvent(data) {
    return new AdapterEvent(data);
  }

  static parseEvents(data) {
    return data.map(AdapterEvent.parseEvent);
  }
}

