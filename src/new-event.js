import {EventEdit} from './eventEdit';
import {eventsBlock, renderEventsViaDays, getTotaslCost} from './events';
import {api, eventsData} from './main';

import moment from 'moment';

const newEventButton = document.querySelector(`.trip-controls__new-event`);

const renderNewEvent = () => {
  const newEentMockData = {
    id: null,
    type: `taxi`,
    destination: `Moscow`,
    offers: [
      {title: `Upgrade to a business class`, price: 40},
      {title: `Choose the radio station`, price: 170},
      {title: `Choose temperature`, price: 170},
      {title: `Drive quickly, I'm in a hurry`, price: 80},
      {title: `Drive slowly`, price: 100}
    ],
    description: `Moscow, with crowded streets, with a beautiful old town.`,
    price: 0,
    pictures: [
      {src: `http://picsum.photos/300/200?r=0.8111762699173315`, description: `Moscow park`},
      {src: `http://picsum.photos/300/200?r=0.8094676570539499`, description: `Moscow parliament building`},
      {src: `http://picsum.photos/300/200?r=0.4682853056161236`, description: `Moscow embankment`},
      {src: `http://picsum.photos/300/200?r=0.5789777919312467`, description: `Moscow kindergarten`},
      {src: `http://picsum.photos/300/200?r=0.06836592836900102`, description: `Moscow street market`},
      {src: `http://picsum.photos/300/200?r=0.11891128464543965`, description: `Moscow parliament building`},
      {src: `http://picsum.photos/300/200?r=0.883970917530243`, description: `Moscow parliament building`},
    ],
    startDate: moment(),
    endDate: moment(),
    isFavorite: false
  };

  const parseNewEventData = (data) => {
    return {
      'type': data.type,
      'base_price': data.price,
      'destination': data.destination,
      'date_from': data.startDate,
      'date_to': data.endDate,
      'offers': data.offers,
      'is_favorite': data.isFavorite,
    };
  };

  newEventButton.disabled = true;

  const newEventEditComponent = new EventEdit(newEentMockData);

  newEventEditComponent.onSubmit = (newData) => {
    const saveButton = newEventEditComponent.element.querySelector(`.point__button[type="submit"]`);
    const deleteButton = newEventEditComponent.element.querySelector(`.point__button[type="reset"]`);
    const inputs = newEventEditComponent.element.querySelectorAll(`input`);

    const block = () => {
      for (const input of inputs) {
        input.disabled = true;
      }

      saveButton.disabled = true;
      saveButton.textContent = `Saving...`;
      deleteButton.disabled = true;
      newEventEditComponent.element.style.boxShadow = `0 11px 20px 0 rgba(0,0,0,0.22)`;
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

    api.createEvent({event: parseNewEventData(newData)})
      .then((newEvent) => {
        unblock();
        console.log(eventsData);
        eventsData.push(newEvent);
        console.log(eventsData);
        getTotaslCost(eventsData);
        renderEventsViaDays(eventsData);
        newEventEditComponent.unrender();
        newEventButton.disabled = false;
      })
      .catch(() => {
        newEventEditComponent.shake();
        unblock();
      });
  };

  newEventEditComponent.onEsc = () => {
    newEventEditComponent.unrender();
    newEventButton.disabled = false;
  };

  eventsBlock.prepend(newEventEditComponent.render());
};

export {renderNewEvent};
export {newEventButton};
