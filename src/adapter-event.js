import moment from 'moment';

export default class AdapterEvent {
  constructor(data) {
    this.id = data.id || null;
    this.price = data.base_price;
    this.startDate = data.date_from || null;
    this.endDate = data.date_to || null;
    this.destination = data.destination.name || ``;
    this.description = data.destination.description || ``;
    this.pictures = data.destination.pictures || [];
    this.isFavorite = Boolean(data.is_favorite) || false;
    this.type = data.type || ``;
    this.offers = data.offers || [];
  }

  toRAW() {
    return {
      'id': this.id || null,
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

