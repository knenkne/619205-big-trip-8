class AdapterEvent {
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

  static parseEvent(data) {
    return new AdapterEvent(data);
  }

  static parseEvents(data) {
    return data.map(AdapterEvent.parseEvent);
  }
}


export {AdapterEvent};
