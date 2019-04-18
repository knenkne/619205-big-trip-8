import {EventEdit} from './event-edit';
import {eventsBlock, renderEventsViaDays, getTotalCost} from './events';
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
      {src: `http://picsum.photos/300/200?r=0.883970917530243`, description: `Moscow parliament building`}
    ],
    startDate: moment(),
    endDate: moment(),
    isFavorite: false
  };

  const parseNewEventData = (data) => {
    return {
      'base_price': parseInt(data.price, 10),
      'date_from': moment(data.startDate).toDate().getTime(),
      'date_to': moment(data.endDate).toDate().getTime(),
      'destination': {
        'name': data.destination,
        'description': data.description,
        'pictures': data.pictures
      },
      'is_favorite': data.isFavorite,
      'type': data.type,
      'offers': data.offers
    };
  };

  newEventButton.disabled = true;

  const newEventEditComponent = new EventEdit(newEentMockData);

  newEventEditComponent.onSubmit = (newData) => {
    const saveButton = newEventEditComponent.element.querySelector(`.point__button[type="submit"]`);
    const deleteButton = newEventEditComponent.element.querySelector(`.point__button[type="reset"]`);
    const inputs = newEventEditComponent.element.querySelectorAll(`input`);
    const priceInput = newEventEditComponent.element.querySelector(`input[name="price"]`);
    const dateInitInputs = newEventEditComponent.element.querySelectorAll(`.point__date input`);
    const timeInitInputs = newEventEditComponent.element.querySelectorAll(`.point__time input`);
    const requiredFields = [priceInput, ...dateInitInputs, ...timeInitInputs];

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

    const checkFieldValues = () => {
      let isPriceValid = true;
      let isDateValid = true;
      let isTimeValid = true;

      for (const requiredField of requiredFields) {
        requiredField.style.borderBottom = `1px solid #0D8AE4`;
      }

      if (priceInput.value.length === 0) {
        priceInput.style.borderBottom = `1px solid red`;
        isPriceValid = false;
      }

      for (const timeInitInput of timeInitInputs) {
        if (timeInitInput.value.length === 0) {
          timeInitInput.style.borderBottom = `1px solid red`;
          isDateValid = false;
        }
      }

      for (const dateInitInput of dateInitInputs) {
        if (dateInitInput.value.length === 0) {
          dateInitInput.style.borderBottom = `1px solid red`;
          isTimeValid = false;
        }
      }

      const isEventValid = isPriceValid && isDateValid && isTimeValid;
      return isEventValid;
    };

    if (checkFieldValues()) {
      block();
      api.createEvent({event: parseNewEventData(newData)})
      .then((newEvent) => {
        unblock();
        eventsData.push(newEvent);
        getTotalCost(eventsData);
        renderEventsViaDays(eventsData);
        newEventEditComponent.unrender();
        newEventButton.disabled = false;
      })
      .catch(() => {
        newEventEditComponent.shake();
        unblock();
      });
    }
  };

  newEventEditComponent.onEsc = () => {
    newEventEditComponent.unrender();
    newEventButton.disabled = false;
  };

  eventsBlock.prepend(newEventEditComponent.render());
};

export {renderNewEvent};
export {newEventButton};
