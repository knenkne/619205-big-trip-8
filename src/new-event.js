import {EventEdit} from './eventEdit';
import {eventsBlock} from './events';
import moment from 'moment';

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
    endDate: moment()
  };


  const newEventEditComponent = new EventEdit(newEentMockData);
  eventsBlock.prepend(newEventEditComponent.render());

  newEventEditComponent.onDelete = () => {
    newEventEditComponent.unrender();
    console.log(`asdasd`);
  };
};

export {renderNewEvent};
