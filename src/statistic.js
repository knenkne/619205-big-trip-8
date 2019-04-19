import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {eventTypes} from './events';
import {eventsData} from './main';
import {BAR_HEIGHT} from './constants';

const transportTypes = [`taxi`, `bus`, `ship`, `train`, `drive`, `flight`];
const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);


// Получаем количество видов транспорта
const getTransportCount = (events, types) => {
  const counter = {};

  // Создаем счетчики для видов транспорта
  for (const type of types) {
    counter[type] = 0;
  }

  for (const event of events) {
    if (counter.hasOwnProperty(event.type)) {
      counter[event.type] += 1;
    }
  }

  return counter;
};

// Получаем количество потраченых денег
const getPriceCount = (events, types) => {
  const counter = {};

  // Создаем счетчики для потраченых денег
  for (const type of types) {
    counter[type] = 0;
  }

  for (const event of events) {
    counter[event.type] += event.price;

    for (const offer of event.offers) {
      if (offer.accepted) {
        counter[event.type] += offer.price;
      }
    }
  }

  return counter;
};

// Получаем количество проведенного времени
const getTimeSpendCount = (events, types) => {
  const counter = {};

  // Создаем счетчики для потраченых денег
  for (const type of types) {
    counter[type] = 0;
  }

  for (const event of events) {
    const timeSpend = moment(moment(event.endDate).diff(moment(event.startDate))).utc().hours();
    counter[event.type] += timeSpend;
  }

  return counter;
};

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
moneyCtx.height = BAR_HEIGHT * 8;
transportCtx.height = BAR_HEIGHT * 5.5;
timeSpendCtx.height = BAR_HEIGHT * 8;

const renderMoneyChart = () => new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`🚕 TAXI`, `🚌 BUS`, `🛳️ SHIP`, `🚊 TRAIN`, `🚗 DRIVE`, `✈️ FLIGHT`, `🏨 CHECK-IN`, `🏛️ SIGHTSEEING`, `🍴 RESTAURANT`],
    datasets: [{
      data: Object.values(getPriceCount(eventsData, Object.keys(eventTypes))),
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `MONEY`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});

const renderTransportChart = () => new Chart(transportCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`🚕 TAXI`, `🚌 BUS`, `🛳️ SHIP`, `🚊 TRAIN`, `🚗 DRIVE`, `✈️ FLIGHT`],
    datasets: [{
      data: Object.values(getTransportCount(eventsData, transportTypes)),
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `${val}x`
      }
    },
    title: {
      display: true,
      text: `TRANSPORT`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});


const renderTimeSpendChart = () => new Chart(timeSpendCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`🚕 TAXI`, `🚌 BUS`, `🛳️ SHIP`, `🚊 TRAIN`, `🚗 DRIVE`, `✈️ FLIGHT`, `🏨 CHECK-IN`, `🏛️ SIGHTSEEING`, `🍴 RESTAURANT`],
    datasets: [{
      data: Object.values(getTimeSpendCount(eventsData, Object.keys(eventTypes))),
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `${val}H`
      }
    },
    title: {
      display: true,
      text: `TIME SPENT`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
});

export {renderMoneyChart};
export {renderTransportChart};
export {renderTimeSpendChart};
export {getPriceCount};
export {getTransportCount};
export {getTimeSpendCount};
export {transportTypes};
